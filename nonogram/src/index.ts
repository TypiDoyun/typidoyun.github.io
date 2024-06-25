import { board, drawBoard } from "./gui.js";

const boardElement = document.getElementById("board") as HTMLDivElement;

window.addEventListener("DOMContentLoaded", () => {
    drawBoard(board);
});