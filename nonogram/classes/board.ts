import { Random } from "../utils/random.js";

export enum BlockType {
    Empty,
    Stone,
    Flag
}

export class Board {
    private _board: BlockType[][];

    constructor(
        private _rows: number,
        private _cols: number
    ) {
        this._board = new Array(_rows).fill(false).map(() => new Array(_cols).fill(0));
    }

    public get board() {
        return this._board;
    }

    public get rows() {
        return this._rows;
    }

    public get cols() {
        return this._cols;
    }

    public set rows(rows: number) {
        this.resize(rows, this._cols);
    }
    
    public set cols(cols: number) {
        this.resize(this._rows, cols);
    }
    
    public set(row: number, col: number, value: BlockType) {
        this._board[row][col] = value;
    }
    
    public toggle(row: number, col: number) {
        this._board[row][col] = (this._board[row][col] + 1) % 3;
    }
    
    public resize(rows: number, cols: number) {
        if (rows <= 0 || cols <= 0) throw new Error("Rows and cols must be greater than 0");
        if (rows % 5 + cols % 5 !== 0) throw new Error("Rows and cols must be divisible by 5");
        this._rows = rows;
        this._cols = cols;
        this._board = new Array(rows).fill(false).map(() => new Array(cols).fill(0));
    }

    public placeStones(seed: number) {
        const rand = Random.pseudoRandom(seed);
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._cols; j++) {
                this.set(i, j, BlockType.Empty);
                if (rand() >= 0.5) continue;
                
                this.set(i, j, BlockType.Stone);
            }
        }
    }

    public getRowAnswers() {
        const answers: number[][] = [];
        for (let i = 0; i < this._rows; i++) {
            let answer: number[] = [];
            let count = 0;
            for (let j = 0; j < this._cols; j++) {
                if (this._board[i][j] === BlockType.Stone) count++;
                if (count !== 0 && this._board[i][j] === BlockType.Empty) {
                    answer.push(count);
                    count = 0;
                }
            }
            if (count !== 0) answer.push(count);
            answers.push(answer);
        }

        return answers;
    }

    public getColAnswers() {
        const answers: number[][] = [];
        for (let j = 0; j < this._cols; j++) {
            let answer: number[] = [];
            let count = 0;
            for (let i = 0; i < this._rows; i++) {
                if (this._board[i][j] === BlockType.Stone) count++;
                if (count !== 0 && this._board[i][j] === BlockType.Empty) {
                    answer.push(count);
                    count = 0;
                }
            }
            if (count !== 0) answer.push(count);
            answers.push(answer);
        }
        return answers;
    }
}