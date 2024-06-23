import { Random } from "../utils/random.js";
export var BlockType;
(function (BlockType) {
    BlockType[BlockType["Empty"] = 0] = "Empty";
    BlockType[BlockType["Stone"] = 1] = "Stone";
    BlockType[BlockType["Flag"] = 2] = "Flag";
})(BlockType || (BlockType = {}));
export class Board {
    _rows;
    _cols;
    _board;
    constructor(_rows, _cols) {
        this._rows = _rows;
        this._cols = _cols;
        this._board = new Array(_rows).fill(false).map(() => new Array(_cols).fill(0));
    }
    get board() {
        return this._board;
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
    }
    placeStones(seed) {
        const rand = Random.pseudoRandom(seed);
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._cols; j++) {
                if (rand() >= 0.5)
                    continue;
                console.log("Placing stone at", i, j);
                this.set(i, j, BlockType.Stone);
            }
        }
    }
}
