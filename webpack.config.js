import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    mode: "production",
    entry: path.join(__dirname, "dist", "index.js"),
    watch: true,
    output: {
        path: __dirname,
        filename: "main.bundle.js"
    },
    optimization: {
        minimize: false,
    },
};
