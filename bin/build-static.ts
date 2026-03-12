/**
 * Utility script to copy static assets from the source directory into the build directory.
 * Includes some special logic for text files in which simple macros can be extended.
 * For this the following settings can be made in file `config.json`:
 * 
 * ````js
 * {
 *     "config": {
 *       "static_dir": "static",                           // Source directory from which to copy files
 *       "build_dir": "build",                             // Target directory to which to copy files
 *       "replace_variables_extensions": ".htm; .html"     // Extensions of text files with macros
 *       "encoding": "utf8"                                // Output file encoding
 *     },
 * }
 * ```
 * 
 * Files without one of the named extensions will simply be copied. Text files, however,
 * will be read line by line and rewritten, expanding macros found in those files along
 * the way (1-pass). Macros can be defined like this:
 * 
 * ```
 * {define macro-name}
 *     Content of the macro, using variables: {variable1}, {variable2}
 * {enddefine}
 * ```
 * 
 * The `{define}` and `{enddefine}` statements must be standing in a separate line each,
 * ignoring leading and trailing whitespace. The macros can then be inserted at other
 * positions like this, again with `{insert}` and `{endinsert}` in separate lines:
 * 
 * ```
 * {insert macro-name}
 *     variable1 = value 1
 *     variable2 = value 2
 * {endinsert}
 * ```
 * 
 * If the name of a variable starts with `url-` or ends with `-url` its value will be
 * URL encoded. Otherwise it will be replaced verbatim, only removing leading and trailing
 * whitespace.
 */

import config   from "../config.js";
import fs       from "node:fs";
import path     from "node:path";
import readline from "node:readline";
import shell    from "shelljs";

shell.mkdir("-p", config.build_dir);

for (let file of shell.ls("-R", config.static_dir)) {
    if (file.startsWith("_") || file.includes("/_")) continue;
    
    let sourcePath = path.join(config.static_dir, file);
    let sourceStat = fs.statSync(sourcePath);
    let buildPath  = path.join(config.build_dir, file);
    
    console.log(file, "=>", buildPath);
    
    if (sourceStat.isDirectory()) {
        // Create sub-directory
        shell.mkdir("-p", buildPath);
    } else {
        // Copy static file and replace macros in text files
        if (!config.replace_variables_extensions.some(extension => file.endsWith(extension))) {
            shell.cp(sourcePath, buildPath);
        } else {
            let sourceLines = readline.createInterface({
                input:     fs.createReadStream(sourcePath, {encoding: config.encoding}),
                crlfDelay: Infinity,
            });

            let buildLines  = "";
            let defineMacro: string[] | null = null;
            let insertMacro: string[] | null = null;

            let macros: Record<string, string[]>      = {};
            let macroParams: Record<string, string> = {};
    
            for await (let line of sourceLines) {
                let lineTrimmed = line.trim();

                if (defineMacro) {
                    if (lineTrimmed === "{enddefine}") {
                        defineMacro = null;
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

                        insertMacro = null;
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
    
            fs.writeFileSync(buildPath, buildLines, {encoding: config.encoding});
        }
    }
}

