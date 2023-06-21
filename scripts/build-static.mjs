"use strict";

import fs       from "node:fs";
import path     from "node:path";
import readline from "node:readline";
import shell    from "shelljs";

import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const sourceDir = path.normalize(path.join(__dirname, "..", process.env.npm_package_config_static_dir));
const buildDir  = path.normalize(path.join(__dirname, "..", process.env.npm_package_config_build_dir));
const encoding  = process.env.npm_package_config_encoding || "utf8";

const replaceExtensions = process.env.npm_package_config_replace_variables_extensions.split(";").map(v => v.trim());

shell.mkdir("-p", buildDir);

for (let file of shell.ls("-R", sourceDir)) {
    if (file.startsWith("_") || file.includes("/_")) continue;
    
    let sourcePath = path.join(sourceDir, file);
    let sourceStat = fs.statSync(sourcePath);
    let buildPath  = path.join(buildDir, file);
    
    console.log(file, "=>", buildPath);
    
    if (sourceStat.isDirectory()) {
        // Create sub-directory
        shell.mkdir("-p", buildPath);
    } else {
        // Copy static file and replace macros in text files
        if (!replaceExtensions.some(extension => file.endsWith(extension))) {
            shell.cp(sourcePath, buildPath);
        } else {
            let sourceLines = readline.createInterface({
                input:     fs.createReadStream(sourcePath, { encoding }),
                crlfDelay: Infinity,
            });

            let buildLines  = "";
            let macros      = {};
            let defineMacro = undefined;
            let insertMacro = undefined;
            let macroParams = {};
    
            for await (let line of sourceLines) {
                let lineTrimmed = line.trim();

                if (defineMacro) {
                    if (lineTrimmed === "{enddefine}") {
                        defineMacro = undefined;
                        continue;
                    }

                    if (!Object.hasOwn(macros, defineMacro[1])) {
                        macros[defineMacro[1]] = [];
                    }

                    macros[defineMacro[1]].push(line);
                    continue;
                } else if (insertMacro) {
                    if (lineTrimmed === "{endinsert}") {
                        if (!Object.hasOwn(macros, insertMacro[1])) {
                            console.warn(`WARNING: Unknown macro '${insertMacro[1]}' ignored`);
                            continue;
                        }

                        let insertLines = [...macros[insertMacro[1]]];

                        for (let parameterName of Object.keys(macroParams)) {
                            let parameterValue = macroParams[parameterName];

                            if (parameterName.startsWith("url-") || parameterName.endsWith("-url")) {
                                parameterValue = encodeURI(parameterValue);
                            }

                            for (let i = 0; i < insertLines.length; i++) {
                                insertLines[i] = insertLines[i].replaceAll(`{${parameterName}}`, parameterValue); 
                            }
                        }

                        for (let insertLine of insertLines) {
                            buildLines += insertLine + "\n";
                        }

                        insertMacro = undefined;
                        macroParams = {};
                        continue;
                    }

                    let splitIndex = lineTrimmed.indexOf("=");
                    if (splitIndex < 0) continue;
                    let name = lineTrimmed.substring(0, splitIndex).trim()   || "";
                    let value = lineTrimmed.substring(splitIndex + 1).trim() || "";
                    if (!name) continue;

                    macroParams[name] = value;
                    continue;
                }

                defineMacro = lineTrimmed.match(/\{define (.*)\}/);
                if (defineMacro) continue;

                insertMacro = lineTrimmed.match(/\{insert (.*)\}/);
                if (insertMacro) continue;

                buildLines += line + "\n";
            }
    
            fs.writeFileSync(buildPath, buildLines, { encoding });
        }
    }
}

