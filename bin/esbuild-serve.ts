import config       from "../config.js";
import * as esbuild from "esbuild";
import path         from "node:path";

let ctx = await esbuild.context({
    entryPoints: [path.join(config.src_dir, "index.js")],
    bundle:      true,
    outfile:     path.join(config.static_dir, "_bundle.js"),
    sourcemap:   true,
    plugins:     [],
    loader: {
        ".svg":   "text",
        ".ttf":   "dataurl",
        ".woff":  "dataurl",
        ".woff2": "dataurl",
        ".eot":   "dataurl",
        ".jpg":   "dataurl",
        ".png":   "dataurl",
        ".gif":   "dataurl",
    }
});

let { hosts, port } = await ctx.serve({
    servedir: path.join(__dirname, "..", "static"),
    port: 8888,
});

for (let host of hosts || []) {
    console.log(`Listening on ${host}:${port}`);
}