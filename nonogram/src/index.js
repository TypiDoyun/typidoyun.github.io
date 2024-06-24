import { BlockType, Board } from "../classes/board.js";
import { Random } from "../utils/random.js";
const dropdown = document.getElementById("dropdown");
const submitButton = document.getElementById("done");
const boardElement = document.getElementById("board");
const layer = document.getElementById("layer");
const board = new Board(5, 5);
let dragging = false;
let dragType = BlockType.Stone;
window.addEventListener("keypress", eventData => {
    const { key } = eventData;
    switch (key) {
        case "Enter":
            submit();
            break;
        case "r":
            updateBoard();
            break;
        default:
            console.log(key);
    }
});
boardElement.oncontextmenu = event => {
    event.preventDefault();
};
const getBlock = (row, col) => {
    return boardElement.querySelector(`.row-${row} .col-${col}`);
};
const backgroundAnimation = [
    { opacity: "0", display: "inline-block" },
    { opacity: "0.2" },
    { opacity: "0", display: "none" }
];
const animation = [
    { transform: "translate(0, 0) rotate(0deg)" },
    { transform: "translate(5px, 5px) rotate(2deg)" },
    { transform: "translate(0, 0) rotate(0eg)" },
    { transform: "translate(-5px, 5px) rotate(-2deg)" },
    { transform: "translate(0, 0) rotate(0deg)" },
    { transform: "translate(5px, 5px) rotate(2deg)" },
    { transform: "translate(0, 0) rotate(0eg)" },
    { transform: "translate(-5px, 5px) rotate(-2deg)" },
    { transform: "translate(0, 0) rotate(0deg)" }
];
const submit = () => {
    let success = true;
    const rowAnswers = board.getRowAnswers();
    const colAnswers = board.getColAnswers();
    for (let i = 0; i < board.rows; i++) {
        const rowValue = [];
        let count = 0;
        for (let j = 0; j < board.cols; j++) {
            const block = getBlock(i, j);
            if (block?.classList.contains("stone"))
                count++;
            if (count !== 0 && (block?.classList.contains("empty") || block?.classList.contains("flag"))) {
                rowValue.push(count);
                count = 0;
            }
        }
        if (count !== 0) {
            rowValue.push(count);
            count = 0;
        }
        if (rowValue.join(" ") !== rowAnswers[i].join(" ")) {
            success = false;
            break;
        }
    }
    for (let j = 0; j < board.cols; j++) {
        const colValue = [];
        let count = 0;
        for (let i = 0; i < board.rows; i++) {
            const block = getBlock(i, j);
            if (block?.classList.contains("stone"))
                count++;
            if (count !== 0 && (block?.classList.contains("empty") || block?.classList.contains("flag"))) {
                colValue.push(count);
                count = 0;
            }
        }
        if (count !== 0) {
            colValue.push(count);
            count = 0;
        }
        if (colValue.join(" ") !== colAnswers[j].join(" ")) {
            success = false;
            break;
        }
    }
    if (!success) {
        boardElement.animate(animation, {
            duration: 200,
            easing: "ease"
        });
        layer.style.backgroundColor = "#f00";
        layer.animate(backgroundAnimation, {
            duration: 500,
            easing: "ease"
        });
    }
    else {
        layer.style.backgroundColor = "#0e0";
        layer.animate(backgroundAnimation, {
            duration: 500,
            easing: "ease"
        });
    }
};
submitButton.onclick = () => {
    submit();
};
document.onmouseup = () => {
    dragging = false;
};
dropdown.addEventListener("change", eventData => {
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
    updateBoard();
});
const setCSSProperty = (name, value) => document.documentElement.style.setProperty(name, value);
const toggleBlock = (block) => {
    if (block.classList.contains("empty") || block.classList.contains("flag")) {
        setBlock(block, BlockType.Stone);
        return BlockType.Stone;
    }
    else if (block.classList.contains("stone")) {
        setBlock(block, BlockType.Empty);
        return BlockType.Empty;
    }
    return BlockType.Flag;
};
const getLeftBlock = (block) => block.parentElement?.previousElementSibling?.firstElementChild;
const getRightBlock = (block) => block.parentElement?.nextElementSibling?.firstElementChild;
const getTopBlock = (block) => block.parentElement?.parentElement?.previousElementSibling?.querySelector(`.${Array.from(block.classList).find(c => c.startsWith("col-"))}`);
const getBottomBlock = (block) => block.parentElement?.parentElement?.nextElementSibling?.querySelector(`.${Array.from(block.classList).find(c => c.startsWith("col-"))}`);
const setBlock = (block, type) => {
    if (type === BlockType.Empty) {
        block.classList.remove("stone", "flag");
        block.classList.add("empty");
    }
    else if (type === BlockType.Stone) {
        block.classList.remove("empty", "flag");
        block.classList.add("stone");
    }
    else {
        block.classList.remove("empty", "stone");
        block.classList.add("flag");
    }
    const left = getLeftBlock(block);
    const right = getRightBlock(block);
    const top = getTopBlock(block);
    const bottom = getBottomBlock(block);
    const rowAnswers = board.getRowAnswers();
    const colAnswers = board.getColAnswers();
    for (let i = 0; i < board.rows; i++) {
        const rowValue = [];
        let count = 0;
        for (let j = 0; j < board.cols; j++) {
            const block = getBlock(i, j);
            if (block?.classList.contains("stone"))
                count++;
            if (count !== 0 && (block?.classList.contains("empty") || block?.classList.contains("flag"))) {
                rowValue.push(count);
                count = 0;
            }
        }
        if (count !== 0) {
            rowValue.push(count);
            count = 0;
        }
        const text = document.querySelector(`.row-${i} .row-num`);
        text.innerHTML = "";
        for (let j = 0; j < rowAnswers[i].length; j++) {
            if (rowValue[j] === rowAnswers[i][j] && rowAnswers[i].length >= rowValue.length) {
                text.innerHTML += `<span class="bingo">${rowAnswers[i][j]}</span>\t`;
            }
            else {
                text.innerHTML += `${rowAnswers[i][j]}\t`;
            }
        }
    }
    for (let j = 0; j < board.cols; j++) {
        const colValue = [];
        let count = 0;
        for (let i = 0; i < board.rows; i++) {
            const block = getBlock(i, j);
            if (block?.classList.contains("stone"))
                count++;
            if (count !== 0 && (block?.classList.contains("empty") || block?.classList.contains("flag"))) {
                colValue.push(count);
                count = 0;
            }
        }
        if (count !== 0) {
            colValue.push(count);
            count = 0;
        }
        const text = document.querySelector(`.row-0 .col-${j} + .col-num`);
        text.innerHTML = "";
        for (let i = 0; i < colAnswers[j].length; i++) {
            if (colValue[i] === colAnswers[j][i] && colAnswers[j].length >= colValue.length) {
                text.innerHTML += `<span class="bingo">${colAnswers[j][i]}</span><br>`;
            }
            else {
                text.innerHTML += `${colAnswers[j][i]}<br>`;
            }
        }
    }
    if (type === BlockType.Stone && left?.classList.contains("stone")) {
        block.classList.add("connected-left");
        left.classList.add("connected-right");
    }
    else {
        block.classList.remove("connected-left");
        left?.classList.remove("connected-right");
    }
    if (type === BlockType.Stone && right?.classList.contains("stone")) {
        block.classList.add("connected-right");
        right.classList.add("connected-left");
    }
    else {
        block.classList.remove("connected-right");
        right?.classList.remove("connected-left");
    }
    if (type === BlockType.Stone && top?.classList.contains("stone")) {
        block.classList.add("connected-top");
        top.classList.add("connected-bottom");
    }
    else {
        block.classList.remove("connected-top");
        top?.classList.remove("connected-bottom");
    }
    if (type === BlockType.Stone && bottom?.classList.contains("stone")) {
        block.classList.add("connected-bottom");
        bottom.classList.add("connected-top");
    }
    else {
        block.classList.remove("connected-bottom");
        bottom?.classList.remove("connected-top");
    }
    if (left) {
        let connectedCount = Array.from(left.classList).filter(c => c.startsWith("connected")).length;
        left.style.zIndex = `${4 - connectedCount}`;
    }
    if (right) {
        let connectedCount = Array.from(right.classList).filter(c => c.startsWith("connected")).length;
        right.style.zIndex = `${4 - connectedCount}`;
    }
    if (top) {
        let connectedCount = Array.from(top.classList).filter(c => c.startsWith("connected")).length;
        top.style.zIndex = `${4 - connectedCount}`;
    }
    if (bottom) {
        let connectedCount = Array.from(bottom.classList).filter(c => c.startsWith("connected")).length;
        bottom.style.zIndex = `${4 - connectedCount}`;
    }
};
const updateBoard = () => {
    board.placeStones(Random.randInt(1, 1000000));
    setCSSProperty("--board-rows", board.rows.toString());
    setCSSProperty("--board-cols", board.cols.toString());
    setCSSProperty("--block-size", `${80 / (Math.max(board.rows, board.cols) / 5)}px`);
    setCSSProperty("--block-gap", `${12 / (Math.max(board.rows, board.cols) / 5)}px`);
    for (const child of [...boardElement.children]) {
        if (child.id === "done")
            continue;
        boardElement.removeChild(child);
    }
    let firstRow;
    const rowAnswers = board.getRowAnswers();
    const colAnswers = board.getColAnswers();
    for (let i = 0; i < board.rows; i++) {
        const row = document.createElement("div");
        const text = document.createElement("span");
        text.classList.add("num", "row-num");
        text.innerText = rowAnswers[i].join("\t") + "\t";
        text.style.position = "absolute";
        text.style.top = "50%";
        text.style.transformOrigin = "1 0";
        text.style.right = "calc(100% + var(--block-size) / 6)";
        text.style.color = "white";
        text.style.translate = "0 -55%";
        text.style.zIndex = "10";
        let count = 0;
        row.classList.add(`row-${i}`, "row");
        if (i === 0)
            firstRow = row;
        for (let j = 0; j < board.cols; j++) {
            const frame = document.createElement("div");
            frame.classList.add("frame");
            const block = document.createElement("div");
            block.classList.add(`col-${j}`, "block", "empty");
            block.addEventListener("mouseenter", eventData => {
                if (!(eventData.target instanceof HTMLDivElement))
                    return;
                eventData.target.classList.add("hover");
            });
            block.addEventListener("mouseleave", eventData => {
                if (!(eventData.target instanceof HTMLDivElement))
                    return;
                eventData.target.classList.remove("hover");
            });
            block.onmousedown = eventData => {
                if (eventData.button === 2)
                    return;
                dragging = true;
                dragType = toggleBlock(block);
            };
            block.onmouseenter = () => {
                if (!dragging)
                    return;
                setBlock(block, dragType);
            };
            block.oncontextmenu = event => {
                event.preventDefault();
                dragging = true;
                if (block.classList.contains("empty")) {
                    dragType = BlockType.Flag;
                }
                else
                    dragType = BlockType.Empty;
                setBlock(block, dragType);
                return false;
            };
            frame.appendChild(block);
            row.appendChild(frame);
        }
        row.appendChild(text);
        boardElement.appendChild(row);
    }
    for (let j = 0; j < board.cols; j++) {
        const text = document.createElement("span");
        text.classList.add("num", "col-num");
        text.innerText = "";
        text.style.position = "absolute";
        text.style.bottom = "calc(100% + var(--block-size) / 3)";
        text.style.left = "50%";
        text.style.transformOrigin = "1 0";
        text.style.translate = "-50% 0";
        let count = 0;
        for (let i = 0; i < board.rows; i++) {
            if (board.board[i][j] === BlockType.Stone)
                count++;
            if (count !== 0 && board.board[i][j] === BlockType.Empty) {
                text.innerHTML += `${count}<br>`;
                count = 0;
            }
        }
        if (count !== 0) {
            text.innerHTML += `${count}<br>`;
        }
        firstRow.children[j]?.appendChild(text);
    }
};
updateBoard();
