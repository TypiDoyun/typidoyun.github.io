"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_js_1 = require("./gui.js");
const boardElement = document.getElementById("board");
document.addEventListener("contextmenu", eventData => {
    eventData.preventDefault();
});
window.addEventListener("DOMContentLoaded", () => {
    (0, gui_js_1.drawBoard)(gui_js_1.board);
});
