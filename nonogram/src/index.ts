import { board, drawBoard } from "./gui.js";

const boardElement = document.getElementById("board") as HTMLDivElement;

document.addEventListener("contextmenu", eventData => {
    eventData.preventDefault();
})

window.addEventListener("DOMContentLoaded", () => {
    drawBoard(board);
});