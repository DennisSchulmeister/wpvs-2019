import config       from "../config.js";
import * as esbuild from "esbuild";
import path         from "node:path";
import {lessLoader} from "esbuild-plugin-less";

let ctx = await esbuild.context({
    entryPoints: [path.join(config.src_dir, "index.js")],
    bundle:      true,
    outfile:     path.join(config.static_dir, "_bundle.js"),
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
        ".htm":   "text",
        ".html":  "text",
    }
});

let { hosts, port } = await ctx.serve({
    servedir: config.static_dir,
    port: 8888,
});

for (let host of hosts || []) {
    console.log(`Listening on ${host}:${port}`);
}