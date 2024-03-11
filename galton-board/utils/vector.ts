type Vector2 = {
    x: number,
    y: number
}

class Vector {
    private values: [ number, number ];

    public constructor(
        x: number,
        y: number
    ) {
        this.values = [ x, y ];
    }

    public static get ZERO() {
        return new Vector(0, 0);
    }
    public static EPSILON = 1000000;

    public static from(vector: Vector2) {
        return new Vector(vector.x, vector.y);
    }

    public get x() {
        return this.values[0];
    }
    public get y() {
        return this.values[1];
    }
    public set x(value: number) {
        this.values[0] = value;
    }
    public set y(value: number) {
        this.values[1] = value;
    }

    public get(index: 0 | 1) {
        return this.values[index];
    }
    public set(index: 0 | 1, value: number) {
        this.values[index] = value;
    }

    public equals(other: Vector2) {
        return this.x === other.x && this.y === other.y;
    }

    public fromOrigin(origin: Vector2) {
        return new Vector(
            this.x - origin.x,
            this.y - origin.y
        )
    }

    public get lengthSquared(): number {
        return this.x ** 2 + this.y ** 2;
    }

    public get length(): number {
        return this.lengthSquared ** 0.5;
    }

    public set length(value: number) {
        const length = this.length;

        this.x *= value / length;
        this.y *= value / length;
    }

    public get clone() {
        return Vector.from(this);
    }

    public get normalized() {
        const clone = this.clone;
        clone.length = 1;

        return clone;
    }

    public add(value: number | Vector2) {
        if (typeof value === 'number') {
            return new Vector(this.x + value, this.y + value);
        }
        else {
            return new Vector(this.x + value.x, this.y + value.y);
        }
    }

    public sub(value: number | Vector2) {
        if (typeof value === 'number') {
            return new Vector(this.x - value, this.y - value);
        }
        else {
            return new Vector(this.x - value.x, this.y - value.y);
        }
    }

    public multiply(value: number | Vector2) {
        if (typeof value === 'number') {
            return new Vector(this.x * value, this.y * value);
        }
        else {
            return new Vector(this.x * value.x, this.y * value.y);
        }
    }

    public divide(value: number | Vector2) {
        if (typeof value === 'number') {
            return new Vector(this.x / value, this.y / value);
        }
        else {
            return new Vector(this.x / value.x, this.y / value.y);
        }
    }

    public dot(other: Vector2) {
        return this.x * other.x + this.y * other.y;
    }

    public rotate(degrees: number, origin: Vector2 = Vector.ZERO) {
        if (degrees === 0) return this.clone;

        const x = this.x - origin.x;
        const y = this.y - origin.y;
        const radians = degrees * Math.PI / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        return new Vector(
            Math.round(Vector.EPSILON * (cos * x - sin * y)) / Vector.EPSILON + origin.x,
            Math.round(Vector.EPSILON * (sin * x + cos * y)) / Vector.EPSILON + origin.y,
        )
    }

    public min(other: Vector2) {
        return new Vector(
            Math.min(this.x, other.x),
            Math.min(this.y, other.y)
        )
    }

    public max(other: Vector2) {
        return new Vector(
            Math.max(this.x, other.x),
            Math.max(this.y, other.y)
        )
    }

    public floor() {
        return new Vector(
            Math.floor(this.x),
            Math.floor(this.y)
        )
    }

    public ceil() {
        return new Vector(
            Math.ceil(this.x),
            Math.ceil(this.y)
        )
    }

    public round() {
        return new Vector(
            Math.round(this.x),
            Math.round(this.y)
        )
    }

    public abs() {
        return new Vector(
            Math.abs(this.x),
            Math.abs(this.y)
        )
    }

    public lerp(other: Vector2, t: number) {
        return new Vector(
            (1 - t) * this.x + t * other.x,
            (1 - t) * this.y + t * other.y
        )
    }

    public toString() {
        return `{ ${this.x}, ${this.y} }`;
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y
    }
}