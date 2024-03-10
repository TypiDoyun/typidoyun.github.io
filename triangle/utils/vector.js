class Vector {
    values;
    constructor(x, y) {
        this.values = [x, y];
    }
    static get ZERO() {
        return new Vector(0, 0);
    }
    static EPSILON = 1000000;
    static from(vector) {
        return new Vector(vector.x, vector.y);
    }
    get x() {
        return this.values[0];
    }
    get y() {
        return this.values[1];
    }
    set x(value) {
        this.values[0] = value;
    }
    set y(value) {
        this.values[1] = value;
    }
    get(index) {
        return this.values[index];
    }
    set(index, value) {
        this.values[index] = value;
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    fromOrigin(origin) {
        return new Vector(this.x - origin.x, this.y - origin.y);
    }
    get lengthSquared() {
        return this.x ** 2 + this.y ** 2;
    }
    get length() {
        return this.lengthSquared ** 0.5;
    }
    set length(value) {
        const length = this.length;
        this.x *= value / length;
        this.y *= value / length;
    }
    get clone() {
        return Vector.from(this);
    }
    get normalized() {
        const clone = this.clone;
        clone.length = 1;
        return clone;
    }
    add(value) {
        if (typeof value === 'number') {
            return new Vector(this.x + value, this.y + value);
        }
        else {
            return new Vector(this.x + value.x, this.y + value.y);
        }
    }
    sub(value) {
        if (typeof value === 'number') {
            return new Vector(this.x - value, this.y - value);
        }
        else {
            return new Vector(this.x - value.x, this.y - value.y);
        }
    }
    multiply(value) {
        if (typeof value === 'number') {
            return new Vector(this.x * value, this.y * value);
        }
        else {
            return new Vector(this.x * value.x, this.y * value.y);
        }
    }
    divide(value) {
        if (typeof value === 'number') {
            return new Vector(this.x / value, this.y / value);
        }
        else {
            return new Vector(this.x / value.x, this.y / value.y);
        }
    }
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
    rotateX(degrees, origin = Vector.ZERO) {
        if (degrees === 0)
            return this.clone;
        const x = this.x - origin.x;
        const y = this.y - origin.y;
        const radians = degrees * Math.PI / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return new Vector(Math.round(Vector.EPSILON * (cos * x - sin * y)) / Vector.EPSILON + origin.x, Math.round(Vector.EPSILON * (sin * x + cos * y)) / Vector.EPSILON + origin.y);
    }
    min(other) {
        return new Vector(Math.min(this.x, other.x), Math.min(this.y, other.y));
    }
    max(other) {
        return new Vector(Math.max(this.x, other.x), Math.max(this.y, other.y));
    }
    floor() {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }
    ceil() {
        return new Vector(Math.ceil(this.x), Math.ceil(this.y));
    }
    round() {
        return new Vector(Math.round(this.x), Math.round(this.y));
    }
    abs() {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    }
    lerp(other, t) {
        return new Vector((1 - t) * this.x + t * other.x, (1 - t) * this.y + t * other.y);
    }
    toString() {
        return `{ ${this.x}, ${this.y} }`;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
}
