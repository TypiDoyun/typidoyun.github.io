"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawBoard = exports.clickBlock = exports.setBlockType = exports.getBlockType = exports.connectBlock = exports.drawBingo = exports.board = void 0;
const board_js_1 = require("../classes/board.js");
const css_js_1 = require("../utils/css.js");
const keyboard_js_1 = require("../utils/keyboard.js");
const random_js_1 = require("../utils/random.js");
exports.board = new board_js_1.Board(5, 5);
const boardElement = document.getElementById("board");
const dropDown = document.getElementById("dropdown");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const layer = document.getElementById("layer");
keyboard_js_1.Keyboard.addEventListener({
    keyCodes: [
        "Enter"
    ],
    listener(key, eventData) {
        submit();
    }
});
keyboard_js_1.Keyboard.addEventListener({
    keyCodes: [
        "r",
        "ㄱ"
    ],
    listener(key, eventData) {
        (0, exports.drawBoard)(exports.board);
    }
});
submitButton.addEventListener("click", () => {
    submit();
});
retryButton.addEventListener("click", () => {
    (0, exports.drawBoard)(exports.board);
});
dropDown.addEventListener("change", eventData => {
    const { target } = eventData;
    if (!(target instanceof HTMLSelectElement))
        return;
    switch (+target.value) {
        case 5:
            exports.board.resize(5, 5);
            break;
        case 10:
            exports.board.resize(10, 10);
            break;
        case 15:
            exports.board.resize(15, 15);
            break;
        default:
            exports.board.resize(5, 5);
            target.value = "5";
    }
    (0, exports.drawBoard)(exports.board);
});
const submit = () => {
    const rowAnswers = exports.board.getRowAnswers();
    const colAnswers = exports.board.getColAnswers();
    const rowValues = exports.board.getRowElementAnswers();
    const colValues = exports.board.getColElementAnswers();
    let success = true;
    for (let i = 0; i < rowAnswers.length; i++) {
        if (rowAnswers[i].some((answer, index) => answer !== rowValues[i][index]))
            success = false;
    }
    for (let i = 0; i < colAnswers.length; i++) {
        if (colAnswers[i].some((answer, index) => answer !== colValues[i][index]))
            success = false;
    }
    if (success) {
        if (timeTicking)
            record = Date.now();
        timeTicking = false;
        layer.style.backgroundColor = "green";
        css_js_1.CSS.blinkOnce(layer, 500);
    }
    else {
        layer.style.backgroundColor = "red";
        css_js_1.CSS.blinkOnce(layer, 500);
        css_js_1.CSS.shakeOnce(boardElement, 200);
    }
};
const drawBingo = (board) => {
    const rowAnswers = board.getRowAnswers();
    const colAnswers = board.getColAnswers();
    const rowValues = board.getRowElementAnswers();
    const colValues = board.getColElementAnswers();
    for (let i = 0; i < board.rows; i++) {
        const text = document.querySelector(`.row-${i} .row-answer`);
        text.innerHTML = "";
        for (let j = 0; j < rowAnswers[i].length; j++) {
            if (rowValues[i][j] === rowAnswers[i][j] && rowAnswers[i].length >= rowValues[i].length) {
                text.innerHTML += `<span class="bingo">${rowAnswers[i][j]}</span>\t`;
            }
            else {
                text.innerHTML += `${rowAnswers[i][j]}\t`;
            }
        }
    }
    for (let j = 0; j < board.cols; j++) {
        const text = document.querySelector(`.row-0 .frame:nth-child(${j + 2}) .col-answer`);
        text.innerHTML = "";
        for (let i = 0; i < colAnswers[j].length; i++) {
            if (colValues[j][i] === colAnswers[j][i] && colAnswers[j].length >= colValues[j].length) {
                text.innerHTML += `<span class="bingo">${colAnswers[j][i]}</span>\n`;
            }
            else {
                text.innerHTML += `${colAnswers[j][i]}\n`;
            }
        }
    }
};
exports.drawBingo = drawBingo;
const connectBlock = (board, row, col) => {
    const block = board.element[row][col];
    const leftBlock = board.element[row][col - 1];
    const rightBlock = board.element[row][col + 1];
    const topBlock = board.element[row - 1]?.[col];
    const bottomBlock = board.element[row + 1]?.[col];
    if (block.classList.contains("stone")) {
        if (leftBlock?.classList.contains("stone")) {
            block.classList.add("connected-left");
            leftBlock.classList.add("connected-right");
        }
        if (rightBlock?.classList.contains("stone")) {
            block.classList.add("connected-right");
            rightBlock.classList.add("connected-left");
        }
        if (topBlock?.classList.contains("stone")) {
            block.classList.add("connected-top");
            topBlock.classList.add("connected-bottom");
        }
        if (bottomBlock?.classList.contains("stone")) {
            block.classList.add("connected-bottom");
            bottomBlock.classList.add("connected-top");
        }
    }
    else {
        block.classList.remove("connected-left");
        leftBlock?.classList.remove("connected-right");
        block.classList.remove("connected-right");
        rightBlock?.classList.remove("connected-left");
        block.classList.remove("connected-top");
        topBlock?.classList.remove("connected-bottom");
        block.classList.remove("connected-bottom");
        bottomBlock?.classList.remove("connected-top");
    }
    if (leftBlock) {
        let connectedCount = Array.from(leftBlock.classList).filter(c => c.startsWith("connected")).length;
        leftBlock.style.zIndex = `${4 - connectedCount}`;
    }
    if (rightBlock) {
        let connectedCount = Array.from(rightBlock.classList).filter(c => c.startsWith("connected")).length;
        rightBlock.style.zIndex = `${4 - connectedCount}`;
    }
    if (topBlock) {
        let connectedCount = Array.from(topBlock.classList).filter(c => c.startsWith("connected")).length;
        topBlock.style.zIndex = `${4 - connectedCount}`;
    }
    if (bottomBlock) {
        let connectedCount = Array.from(bottomBlock.classList).filter(c => c.startsWith("connected")).length;
        bottomBlock.style.zIndex = `${4 - connectedCount}`;
    }
};
exports.connectBlock = connectBlock;
const getBlockType = (board, row, col) => {
    const block = board.element[row][col];
    if (block.classList.contains("empty"))
        return board_js_1.BlockType.Empty;
    if (block.classList.contains("flag"))
        return board_js_1.BlockType.Flag;
    if (block.classList.contains("stone"))
        return board_js_1.BlockType.Stone;
    throw new Error("Invalid block type");
};
exports.getBlockType = getBlockType;
const setBlockType = (board, row, col, blockType) => {
    const block = board.element[row][col];
    const className = blockType === board_js_1.BlockType.Empty ? "empty" : (blockType === board_js_1.BlockType.Flag ? "flag" : "stone");
    block.classList.remove("empty", "flag", "stone");
    block.classList.add(className);
    (0, exports.drawBingo)(board);
    (0, exports.connectBlock)(board, row, col);
    return blockType;
};
exports.setBlockType = setBlockType;
const clickBlock = (type, board, row, col) => {
    const blockType = (0, exports.getBlockType)(board, row, col);
    switch (type) {
        case "left":
            if ([board_js_1.BlockType.Empty, board_js_1.BlockType.Flag].includes(blockType)) {
                return (0, exports.setBlockType)(board, row, col, board_js_1.BlockType.Stone);
            }
            else {
                return (0, exports.setBlockType)(board, row, col, board_js_1.BlockType.Empty);
            }
        case "right":
            if ([board_js_1.BlockType.Flag, board_js_1.BlockType.Stone].includes(blockType)) {
                return (0, exports.setBlockType)(board, row, col, board_js_1.BlockType.Empty);
            }
            else {
                return (0, exports.setBlockType)(board, row, col, board_js_1.BlockType.Flag);
            }
        default:
            throw new Error("Invalid click type");
    }
};
exports.clickBlock = clickBlock;
let isDragging = false;
let dragType;
document.addEventListener("mouseup", () => {
    isDragging = false;
});
let startTime = Date.now();
let record;
let timeTicking = true;
const time = document.getElementById("time");
setInterval(() => {
    const d = (timeTicking ? Date.now() : record) - startTime;
    const minutes = (d / 60000).toFixed(0).padStart(2, "0");
    const seconds = ((d % 60000) / 1000).toFixed(0).padStart(2, "0");
    const ms = (d % 1000 / 10).toFixed(0).padStart(2, "0");
    time.innerText = `${minutes}:${seconds}:${ms}`;
});
const drawBoard = (board) => {
    console.log(board.board);
    startTime = Date.now();
    timeTicking = true;
    const seed = random_js_1.Random.randInt(1, 10000000);
    board.placeStones(seed);
    css_js_1.CSS.setProperty("--board-rows", board.rows.toString());
    css_js_1.CSS.setProperty("--board-cols", board.cols.toString());
    css_js_1.CSS.setProperty("--block-size", `${80 / (Math.max(board.rows, board.cols) / 5)}px`);
    css_js_1.CSS.setProperty("--block-gap", `${12 / (Math.max(board.rows, board.cols) / 5)}px`);
    for (const child of [...boardElement.children]) {
        if (child.id)
            continue;
        boardElement.removeChild(child);
    }
    const rowAnswers = board.getRowAnswers();
    const colAnswers = board.getColAnswers();
    for (let row = 0; row < board.rows; row++) {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row", `row-${row}`);
        const text = document.createElement("span");
        text.classList.add("answer", "row-answer");
        text.innerText = `${rowAnswers[row].join("\t")}\t`;
        rowElement.appendChild(text);
        for (let col = 0; col < board.cols; col++) {
            const frame = document.createElement("div");
            const block = document.createElement("div");
            if (row === 0) {
                const colText = document.createElement("span");
                colText.classList.add("answer", "col-answer");
                colText.innerText = `${colAnswers[col].join("\n")}`;
                frame.appendChild(colText);
            }
            frame.classList.add("frame");
            block.classList.add(`col-${col}`, "block", "empty");
            board.element[row][col] = block;
            frame.addEventListener("mousedown", eventData => {
                const clickType = (eventData.button === 2 || eventData.which === 3) ? "right" : "left";
                isDragging = true;
                dragType = (0, exports.clickBlock)(clickType, board, row, col);
                console.log(dragType);
            });
            frame.addEventListener("mouseenter", () => {
                if (!isDragging)
                    return;
                (0, exports.setBlockType)(board, row, col, dragType);
            });
            frame.appendChild(block);
            rowElement.appendChild(frame);
        }
        boardElement.appendChild(rowElement);
    }
};
exports.drawBoard = drawBoard;
