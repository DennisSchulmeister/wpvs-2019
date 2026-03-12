import path   from "node:path";
import url    from "node:url";

const sourceDir = path.dirname(url.fileURLToPath(import.meta.url));


interface Config {
    src_dir:    string;
    static_dir: string;
    build_dir:  string;
    public_url: string;
    replace_variables_extensions: string[];
    encoding: BufferEncoding;
};

export default {
    src_dir:    path.normalize(path.join(sourceDir, "src")),
    static_dir: path.normalize(path.join(sourceDir, "static")),
    build_dir:  path.normalize(path.join(sourceDir, "build")),
    public_url: "",
    replace_variables_extensions: [".htm", ".html"],
    encoding: "utf8",
} as Config;