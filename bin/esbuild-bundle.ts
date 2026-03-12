import config       from "../config.js";
import * as esbuild from "esbuild";
import path         from "node:path";
import {lessLoader} from "esbuild-plugin-less";

esbuild.build({
    entryPoints: [path.join(config.src_dir, "index.js")],
    bundle:      true,
    minify:      true,
    outfile:     path.join(config.build_dir, "_bundle.js"),
    sourcemap:   true,
    plugins:     [lessLoader()],
    loader: {
        ".svg":   "text",
        ".ttf":   "dataurl",
        ".woff":  "dataurl",
        ".woff2": "dataurl",
        ".eot":   "dataurl",
        ".jpg":   "dataurl",
        ".png":   "dataurl",
        ".gif":   "dataurl",
        ".htm":   "dataurl",
        ".html":  "dataurl",
    },
});