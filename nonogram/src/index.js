import { board, drawBoard } from "./gui.js";
const boardElement = document.getElementById("board");
window.addEventListener("DOMContentLoaded", () => {
    drawBoard(board);
});
