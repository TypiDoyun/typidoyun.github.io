import { BlockType, Board } from "../classes/board.js";

const dropdown = document.getElementById("dropdown") as HTMLSelectElement;
const boardElement = document.getElementById("board") as HTMLDivElement;
const board = new Board(5, 5);

let dragging = false;
let dragType = BlockType.Stone;

boardElement.oncontextmenu = event => {
    event.preventDefault();
}

document.onmouseup = () => {
    dragging = false;
}

dropdown.addEventListener("change", eventData => {
    const { target } = eventData;

    if (!(target instanceof HTMLSelectElement)) return;

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

const setCSSProperty = (name: string, value: string) => document.documentElement.style.setProperty(name, value);
const toggleBlock = (block: HTMLDivElement) => {
    if (block.classList.contains("empty") || block.classList.contains("flag")) {
        setBlock(block, BlockType.Stone);
        return BlockType.Stone;
    } else if (block.classList.contains("stone")) {
        setBlock(block, BlockType.Empty);
        return BlockType.Empty;
    }
    return BlockType.Flag;
}
const getLeftBlock = (block: HTMLDivElement) => block.parentElement?.previousElementSibling?.firstElementChild as HTMLDivElement | null;
const getRightBlock = (block: HTMLDivElement) => block.parentElement?.nextElementSibling?.firstElementChild as HTMLDivElement | null;
const getTopBlock = (block: HTMLDivElement) => block.parentElement?.parentElement?.previousElementSibling?.querySelector(`.${Array.from(block.classList).find(c => c.startsWith("col-"))}`) as HTMLDivElement | null;
const getBottomBlock = (block: HTMLDivElement) => block.parentElement?.parentElement?.nextElementSibling?.querySelector(`.${Array.from(block.classList).find(c => c.startsWith("col-"))}`) as HTMLDivElement | null;
const setBlock = (block: HTMLDivElement, type: BlockType) => {
    if (type === BlockType.Empty) {
        block.classList.remove("stone", "flag");
        block.classList.add("empty");
    } else if (type === BlockType.Stone) {
        block.classList.remove("empty", "flag");
        block.classList.add("stone");
    } else {
        block.classList.remove("empty", "stone");
        block.classList.add("flag");
    }

    const left = getLeftBlock(block);
    const right = getRightBlock(block);
    const top = getTopBlock(block);
    const bottom = getBottomBlock(block);

    if (type === BlockType.Stone && left?.classList.contains("stone")) {
        block.classList.add("connected-left");
        left.classList.add("connected-right");
    } else {
        block.classList.remove("connected-left");
        left?.classList.remove("connected-right");
    }

    if (type === BlockType.Stone && right?.classList.contains("stone")) {
        block.classList.add("connected-right");
        right.classList.add("connected-left");
    } else {
        block.classList.remove("connected-right");
        right?.classList.remove("connected-left");
    }

    if (type === BlockType.Stone && top?.classList.contains("stone")) {
        block.classList.add("connected-top");
        top.classList.add("connected-bottom");
    } else {
        block.classList.remove("connected-top");
        top?.classList.remove("connected-bottom");
    }

    if (type === BlockType.Stone && bottom?.classList.contains("stone")) {
        block.classList.add("connected-bottom");
        bottom.classList.add("connected-top");
    } else {
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
}
const updateBoard = () => {
    setCSSProperty("--board-rows", board.rows.toString());
    setCSSProperty("--board-cols", board.cols.toString());
    setCSSProperty("--block-size", `${120 / (Math.max(board.rows, board.cols) / 5)}px`);
    setCSSProperty("--block-gap", `${12 / (Math.max(board.rows, board.cols) / 5)}px`);
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }

    for (let i = 0; i < board.rows; i++) {
        const row = document.createElement("div");
        row.classList.add(`row-${i}`, "row");

        for (let j = 0; j < board.cols; j++) {
            const frame = document.createElement("div");
            frame.classList.add("frame");
            const block = document.createElement("div");
            block.classList.add(`col-${j}`, "block", "empty");
            block.addEventListener("mouseenter", eventData => {
                if (!(eventData.target instanceof HTMLDivElement)) return;

                eventData.target.classList.add("hover");
            });
            block.addEventListener("mouseleave", eventData => {
                if (!(eventData.target instanceof HTMLDivElement)) return;

                eventData.target.classList.remove("hover");
            
            })
            block.onmousedown = eventData => {
                if (eventData.button === 2) return;
                dragging = true;
                dragType = toggleBlock(block);
            }
            block.onmouseenter = () => {
                if (!dragging) return;
                setBlock(block, dragType);
            }
            block.oncontextmenu = event => {
                event.preventDefault();
                dragging = true;
                if (block.classList.contains("empty")) {
                    dragType = BlockType.Flag;
                }
                else dragType = BlockType.Empty;
                setBlock(block, dragType);
                return false;
            }
            frame.appendChild(block);
            row.appendChild(frame);
        }
        boardElement.appendChild(row);
    }
}

updateBoard();