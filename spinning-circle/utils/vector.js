"use strict";
class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    ;
    get length() {
        return (this.x ** 2 + this.y ** 2 + this.z ** 2) ** 0.5;
    }
    get normalized() {
        const vector = new Vector(this.x, this.y, this.z);
        vector.x /= this.length;
        vector.y /= this.length;
        vector.z /= this.length;
        return vector;
    }
    equals(vector) {
        return this.x === vector.x && this.y === vector.y && this.z === vector.z;
    }
    rotate(axis, radians) {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);
        const rotate3D = (a, b) => [cos * a - sin * b, sin * a + cos * b];
        switch (axis) {
            case Axis.X:
                [this.y, this.z] = rotate3D(this.y, this.z);
                break;
            case Axis.Y:
                [this.x, this.z] = rotate3D(this.x, this.z);
                break;
            case Axis.Z:
                [this.x, this.y] = rotate3D(this.x, this.y);
                break;
        }
    }
    multiRotated(axes, radians) {
        if (axes.length != radians.length)
            throw new Error("multiRotated Error!");
        const vector = new Vector(this.x, this.y, this.z);
        for (let i = 0; i < axes.length; i++) {
            const radian = radians[i];
            const axis = axes[i];
            const sin = Math.sin(radian);
            const cos = Math.cos(radian);
            const rotate3D = (a, b) => [cos * a - sin * b, sin * a + cos * b];
            switch (axis) {
                case Axis.X:
                    [vector.y, vector.z] = rotate3D(vector.y, vector.z);
                    break;
                case Axis.Y:
                    [vector.x, vector.z] = rotate3D(vector.x, vector.z);
                    break;
                case Axis.Z:
                    [vector.x, vector.y] = rotate3D(vector.x, vector.y);
                    break;
            }
        }
        return vector;
    }
    rotated(axis, radians) {
        const vector = new Vector(this.x, this.y, this.z);
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);
        const rotate3D = (a, b) => [cos * a - sin * b, sin * a + cos * b];
        switch (axis) {
            case Axis.X:
                [vector.y, vector.z] = rotate3D(this.y, this.z);
                break;
            case Axis.Y:
                [vector.x, vector.z] = rotate3D(this.x, this.z);
                break;
            case Axis.Z:
                [vector.x, vector.y] = rotate3D(this.x, this.y);
                break;
        }
        return vector;
    }
    dotProduct(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }
    cosSimilarity(vector) {
        return this.dotProduct(vector) / (this.length * vector.length);
    }
}
