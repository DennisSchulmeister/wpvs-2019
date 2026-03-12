import config from "../config.js";
import path   from "node:path";
import shell  from "shelljs";

shell.rm("-rf", path.join(config.build_dir, "*"));
