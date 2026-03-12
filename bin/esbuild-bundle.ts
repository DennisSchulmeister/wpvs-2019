import config       from "../config.js";
import * as esbuild from "esbuild";
import path         from "node:path";

esbuild.build({
    entryPoints: [path.join(config.src_dir, "index.js")],
    bundle:      true,
    minify:      true,
    outfile:     path.join(config.build_dir, "_bundle.js"),
    sourcemap:   true,
    loader: {
        ".svg":   "text",
        ".ttf":   "dataurl",
        ".woff":  "dataurl",
        ".woff2": "dataurl",
        ".eot":   "dataurl",
        ".jpg":   "dataurl",
        ".png":   "dataurl",
        ".gif":   "dataurl",
    },
});