class Path {
    constructor(public x: number, public y: number, public parent?: Path, public g: number = 0) {}

    public getH(path: Path) {
        return (Math.abs(path.x - this.x) + Math.abs(path.y - this.y)) * 10;
    }

    public getF(path: Path) {
        return this.getH(path) + this.g;
    }

    public equals(other: Path) {
        return this.x === other.x && this.y === other.y;
    }
}