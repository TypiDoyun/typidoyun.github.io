import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    mode: "production",
    entry: {
        "polygon-area": path.join(__dirname, "dist/polygon-area/src", "index.js"),
    },
    watch: true,
    output: {
        path: __dirname,
        filename: "[name]/main.bundle.js"
    },
    optimization: {
        minimize: false,
    },
};
