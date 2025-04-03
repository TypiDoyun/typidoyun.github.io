"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Path {
    x;
    y;
    parent;
    g;
    constructor(x, y, parent, g = 0) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.g = g;
    }
    getH(path) {
        return (Math.abs(path.x - this.x) + Math.abs(path.y - this.y)) * 10;
    }
    getF(path) {
        return this.getH(path) + this.g;
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}
