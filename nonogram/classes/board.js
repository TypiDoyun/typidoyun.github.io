"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.BlockType = void 0;
const random_js_1 = require("../utils/random.js");
var BlockType;
(function (BlockType) {
    BlockType[BlockType["Empty"] = 0] = "Empty";
    BlockType[BlockType["Stone"] = 1] = "Stone";
    BlockType[BlockType["Flag"] = 2] = "Flag";
})(BlockType || (exports.BlockType = BlockType = {}));
class Board {
    _rows;
    _cols;
    _board;
    _elementBoard;
    constructor(_rows, _cols) {
        this._rows = _rows;
        this._cols = _cols;
        this._board = new Array(_rows).fill(false).map(() => new Array(_cols).fill(0));
        this._elementBoard = new Array(_rows).fill(false).map(() => new Array(_cols).fill(null));
    }
    get board() {
        return this._board;
    }
    get element() {
        return this._elementBoard;
    }
    get rows() {
        return this._rows;
    }
    get cols() {
        return this._cols;
    }
    set rows(rows) {
        this.resize(rows, this._cols);
    }
    set cols(cols) {
        this.resize(this._rows, cols);
    }
    set(row, col, value) {
        this._board[row][col] = value;
    }
    toggle(row, col) {
        this._board[row][col] = (this._board[row][col] + 1) % 3;
    }
    resize(rows, cols) {
        if (rows <= 0 || cols <= 0)
            throw new Error("Rows and cols must be greater than 0");
        if (rows % 5 + cols % 5 !== 0)
            throw new Error("Rows and cols must be divisible by 5");
        this._rows = rows;
        this._cols = cols;
        this._board = new Array(rows).fill(false).map(() => new Array(cols).fill(0));
        this._elementBoard = new Array(rows).fill(false).map(() => new Array(cols).fill(null));
    }
    placeStones(seed) {
        const rand = random_js_1.Random.pseudoRandom(seed);
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._cols; j++) {
                this.set(i, j, BlockType.Empty);
                if (rand() >= 0.5)
                    continue;
                this.set(i, j, BlockType.Stone);
            }
        }
    }
    getRowAnswers() {
        const answers = [];
        for (let i = 0; i < this._rows; i++) {
            let answer = [];
            let count = 0;
            for (let j = 0; j < this._cols; j++) {
                if (this._board[i][j] === BlockType.Stone)
                    count++;
                if (count !== 0 && this._board[i][j] !== BlockType.Stone) {
                    answer.push(count);
                    count = 0;
                }
            }
            if (count !== 0)
                answer.push(count);
            answers.push(answer);
        }
        return answers;
    }
    getColAnswers() {
        const answers = [];
        for (let j = 0; j < this._cols; j++) {
            let answer = [];
            let count = 0;
            for (let i = 0; i < this._rows; i++) {
                if (this._board[i][j] === BlockType.Stone)
                    count++;
                if (count !== 0 && this._board[i][j] !== BlockType.Stone) {
                    answer.push(count);
                    count = 0;
                }
            }
            if (count !== 0)
                answer.push(count);
            answers.push(answer);
        }
        return answers;
    }
    getRowElementAnswers() {
        const answers = [];
        for (let i = 0; i < this._rows; i++) {
            let answer = [];
            let count = 0;
            for (let j = 0; j < this._cols; j++) {
                const element = this._elementBoard[i][j];
                if (element.classList.contains("stone"))
                    count++;
                if (count !== 0 && !element.classList.contains("stone")) {
                    answer.push(count);
                    count = 0;
                }
            }
            if (count !== 0)
                answer.push(count);
            answers.push(answer);
        }
        return answers;
    }
    getColElementAnswers() {
        const answers = [];
        for (let j = 0; j < this._cols; j++) {
            let answer = [];
            let count = 0;
            for (let i = 0; i < this._rows; i++) {
                const element = this._elementBoard[i][j];
                if (element.classList.contains("stone"))
                    count++;
                if (count !== 0 && !element.classList.contains("stone")) {
                    answer.push(count);
                    count = 0;
                }
            }
            if (count !== 0)
                answer.push(count);
            answers.push(answer);
        }
        return answers;
    }
}
exports.Board = Board;
