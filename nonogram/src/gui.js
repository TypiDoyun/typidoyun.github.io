import { BlockType, Board } from "../classes/board.js";
import { CSS } from "../utils/css.js";
import { Keyboard } from "../utils/keyboard.js";
import { Random } from "../utils/random.js";
export const board = new Board(5, 5);
const boardElement = document.getElementById("board");
const dropDown = document.getElementById("dropdown");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const layer = document.getElementById("layer");
Keyboard.addEventListener({
    keyCodes: [
        "Enter"
    ],
    listener(key, eventData) {
        submit();
    }
});
Keyboard.addEventListener({
    keyCodes: [
        "r",
        "ㄱ"
    ],
    listener(key, eventData) {
        drawBoard(board);
    }
});
submitButton.addEventListener("click", () => {
    submit();
});
retryButton.addEventListener("click", () => {
    drawBoard(board);
});
dropDown.addEventListener("change", eventData => {
    const { target } = eventData;
    if (!(target instanceof HTMLSelectElement))
        return;
    switch (+target.value) {
        case 5:
            board.resize(5, 5);
            break;
        case 10:
            board.resize(10, 10);
            break;
        case 15:
            board.resize(15, 15);
            break;
        default:
            board.resize(5, 5);
            target.value = "5";
    }
    drawBoard(board);
});
const submit = () => {
    const rowAnswers = board.getRowAnswers();
    const colAnswers = board.getColAnswers();
    const rowValues = board.getRowElementAnswers();
    const colValues = board.getColElementAnswers();
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
        CSS.blinkOnce(layer, 500);
    }
    else {
        layer.style.backgroundColor = "red";
        CSS.blinkOnce(layer, 500);
        CSS.shakeOnce(boardElement, 200);
    }
};
export const drawBingo = (board) => {
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
export const connectBlock = (board, row, col) => {
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
export const getBlockType = (board, row, col) => {
    const block = board.element[row][col];
    if (block.classList.contains("empty"))
        return BlockType.Empty;
    if (block.classList.contains("flag"))
        return BlockType.Flag;
    if (block.classList.contains("stone"))
        return BlockType.Stone;
    throw new Error("Invalid block type");
};
export const setBlockType = (board, row, col, blockType) => {
    const block = board.element[row][col];
    const className = blockType === BlockType.Empty ? "empty" : (blockType === BlockType.Flag ? "flag" : "stone");
    block.classList.remove("empty", "flag", "stone");
    block.classList.add(className);
    drawBingo(board);
    connectBlock(board, row, col);
    return blockType;
};
export const clickBlock = (type, board, row, col) => {
    const blockType = getBlockType(board, row, col);
    switch (type) {
        case "left":
            if ([BlockType.Empty, BlockType.Flag].includes(blockType)) {
                return setBlockType(board, row, col, BlockType.Stone);
            }
            else {
                return setBlockType(board, row, col, BlockType.Empty);
            }
        case "right":
            if ([BlockType.Flag, BlockType.Stone].includes(blockType)) {
                return setBlockType(board, row, col, BlockType.Empty);
            }
            else {
                return setBlockType(board, row, col, BlockType.Flag);
            }
        default:
            throw new Error("Invalid click type");
    }
};
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
export const drawBoard = (board) => {
    console.log(board.board);
    startTime = Date.now();
    timeTicking = true;
    const seed = Random.randInt(1, 10000000);
    board.placeStones(seed);
    CSS.setProperty("--board-rows", board.rows.toString());
    CSS.setProperty("--board-cols", board.cols.toString());
    CSS.setProperty("--block-size", `${80 / (Math.max(board.rows, board.cols) / 5)}px`);
    CSS.setProperty("--block-gap", `${12 / (Math.max(board.rows, board.cols) / 5)}px`);
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
                dragType = clickBlock(clickType, board, row, col);
                console.log(dragType);
            });
            frame.addEventListener("mouseenter", () => {
                if (!isDragging)
                    return;
                setBlockType(board, row, col, dragType);
            });
            frame.appendChild(block);
            rowElement.appendChild(frame);
        }
        boardElement.appendChild(rowElement);
    }
};
