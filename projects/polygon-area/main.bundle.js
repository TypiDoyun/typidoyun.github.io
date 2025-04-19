/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./node_modules/vecs-ts/dist/quat.js
class Quat {
    constructor(x, y, z, w) {
        this.values = new Float64Array(4).fill(0);
        this.values[0] = x;
        this.values[1] = y;
        this.values[2] = z;
        this.values[3] = w;
    }
    *[Symbol.iterator]() {
        yield* this.values;
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case "number":
                return this.length;
            case "string":
            default:
                return this.toString();
        }
    }
    static get zero() {
        return new Quat(0, 0, 0, 0);
    }
    get x() {
        return this.values[0];
    }
    set x(value) {
        this.values[0] = value;
    }
    get [0]() {
        return this.values[0];
    }
    set [0](value) {
        this.values[0] = value;
    }
    get y() {
        return this.values[1];
    }
    set y(value) {
        this.values[1] = value;
    }
    get [1]() {
        return this.values[1];
    }
    set [1](value) {
        this.values[1] = value;
    }
    get z() {
        return this.values[2];
    }
    set z(value) {
        this.values[2] = value;
    }
    get [2]() {
        return this.values[2];
    }
    set [2](value) {
        this.values[2] = value;
    }
    get w() {
        return this.values[3];
    }
    set w(value) {
        this.values[3] = value;
    }
    get [3]() {
        return this.values[3];
    }
    set [3](value) {
        this.values[3] = value;
    }
    get lengthSquared() {
        return this.values[0] * this.values[0] + this.values[1] * this.values[1] + this.values[2] * this.values[2] + this.values[3] * this.values[3];
    }
    get length() {
        return Math.hypot(this.values[0], this.values[1], this.values[2], this.values[3]);
    }
    get clone() {
        return new Quat(this.values[0], this.values[1], this.values[2], this.values[3]);
    }
    get conjugate() {
        return new Quat(-this.values[0], -this.values[1], -this.values[2], this.values[3]);
    }
    get normalized() {
        const length = this.length;
        if (length === 0)
            return Quat.zero;
        return new Quat(this.values[0] / length, this.values[1] / length, this.values[2] / length, this.values[3] / length);
    }
    add(quaternion) {
        this.values[0] += quaternion.values[0];
        this.values[1] += quaternion.values[1];
        this.values[2] += quaternion.values[2];
        this.values[3] += quaternion.values[3];
        return this;
    }
    sub(quaternion) {
        this.values[0] -= quaternion.values[0];
        this.values[1] -= quaternion.values[1];
        this.values[2] -= quaternion.values[2];
        this.values[3] -= quaternion.values[3];
        return this;
    }
    mul(quaternion) {
        const { x, y, z, w } = this;
        const { x: qx, y: qy, z: qz, w: qw } = quaternion;
        this.x = w * qx + qw * x + y * qz - z * qy;
        this.y = w * qy + qw * y + z * qx - x * qz;
        this.z = w * qz + qw * z + x * qy - y * qx;
        this.w = w * qw - x * qx - y * qy - z * qz;
        return this;
    }
    toString() {
        return `(${this.values[0]}, ${this.values[1]}, ${this.values[2]}, ${this.values[3]})`;
    }
}

;// ./node_modules/vecs-ts/dist/vec2.js
class Vec2 {
    constructor(x, y) {
        this.values = new Float64Array(2).fill(0);
        this.values[0] = x;
        this.values[1] = y;
    }
    static from(vec) {
        return new Vec2(vec.x, vec.y);
    }
    static fromScalar(scalar) {
        return new Vec2(scalar, scalar);
    }
    static fromArray(arr) {
        return new Vec2(arr[0], arr[1]);
    }
    static fromString(str) {
        const [x, y] = str.slice(1, -1).split(", ").map(parseFloat);
        return new Vec2(x, y);
    }
    /**
     * 두 벡터를 더한 새로운 Vec2 객체를 반환합니다.
     * @param a 더할 벡터
     * @param b 더할 벡터
     * @returns 두 벡터를 더한 새로운 Vec2 객체
     */
    static add(a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }
    /**
     * 두 벡터를 뺀 새로운 Vec2 객체를 반환합니다.
     * @param a 벡터
     * @param b 빼는 벡터
     * @returns 두 벡터를 뺀 새로운 Vec2 객체
     */
    static sub(a, b) {
        return new Vec2(a.x - b.x, a.y - b.y);
    }
    /**
     * 두 벡터를 곱한 새로운 Vec2 객체를 반환합니다.
     * @param a 곱할 벡터
     * @param b 곱할 벡터
     * @returns 두 벡터를 곱한 새로운 Vec2 객체
     */
    static mul(a, b) {
        return new Vec2(a.x * b.x, a.y * b.y);
    }
    /**
     * 두 벡터를 나눈 새로운 Vec2 객체를 반환합니다.
     * @param a 나눌 벡터
     * @param b 나누는 벡터
     * @returns 두 벡터를 나눈 새로운 Vec2 객체
     */
    static div(a, b) {
        return new Vec2(a.x / b.x, a.y / b.y);
    }
    /**
     * 두 벡터를 나눈 나머지를 구한 새로운 Vec2 객체를 반환합니다.
     * @param a 나머지를 구할 벡터
     * @param b 나누는 벡터
     * @returns 두 벡터의 나머지를 구한 새로운 Vec2 객체
     */
    static mod(a, b) {
        return new Vec2(a.x % b.x, a.y % b.y);
    }
    /**
     * 두 벡터의 내적을 반환합니다.
     * @param a 내적할 벡터
     * @param b 내적할 벡터
     * @returns 두 벡터의 내적
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    /**
     * 두 벡터의 외적을 반환합니다.
     * @param a 외적할 벡터
     * @param b 외적할 벡터
     * @returns 두 벡터의 외적
     */
    static cross(a, b) {
        return a.x * b.y - a.y * b.x;
    }
    /**
     * 두 벡터의 거리를 반환합니다.
     * @param a 거리 구할 벡터
     * @param b 거리 구할 벡터
     * @returns 두 벡터의 거리
     */
    static distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }
    /**
     * 두 벡터의 거리의 제곱을 반환합니다.
     * @param a 거리 구할 벡터
     * @param b 거리 구할 벡터
     * @returns 두 벡터의 거리의 제곱
     */
    static distanceSquared(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return dx * dx + dy * dy;
    }
    /**
     * 두 벡터의 맨해튼 거리를 반환합니다.
     * @param a 거리 구할 벡터
     * @param b 거리 구할 벡터
     * @returns 두 벡터의 맨해튼 거리
     */
    static manhattanDistance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    /**
     * 두 벡터의 택시캡 거리를 반환합니다.
     * @param a 거리 구할 벡터
     * @param b 거리 구할 벡터
     * @returns 두 벡터의 택시캡 거리
     */
    static taxicabDistance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    *[Symbol.iterator]() {
        yield* this.values;
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case "number":
                return this.length;
            case "string":
            default:
                return this.toString();
        }
    }
    /**
     * @returns 영벡터를 반환합니다.
     */
    static get zero() {
        return new Vec2(0, 0);
    }
    /**
     * @returns 모든 요소가 1인 벡터를 반환합니다.
     */
    static get one() {
        return new Vec2(1, 1);
    }
    /**
     * @returns x요소가 1인 벡터를 반환합니다.
     */
    static get right() {
        return new Vec2(1, 0);
    }
    /**
     * @returns x요소가 -1인 벡터를 반환합니다.
     */
    static get left() {
        return new Vec2(-1, 0);
    }
    /**
     * @returns y요소가 1인 벡터를 반환합니다.
     */
    static get up() {
        return new Vec2(0, 1);
    }
    /**
     * @returns y요소가 -1인 벡터를 반환합니다.
     */
    static get down() {
        return new Vec2(0, -1);
    }
    /**
     * @returns 벡터의 길이의 제곱을 반환합니다.
     */
    get lengthSquared() {
        return (this.values[0] * this.values[0] + this.values[1] * this.values[1]);
    }
    /**
     * @alias magnitude
     * @returns 벡터의 크기를 반환합니다.
     */
    get length() {
        return Math.hypot(this.values[0], this.values[1]);
    }
    /**
     * @alias magnitude
     * @param value 벡터의 크기
     * @example
     * const vec = new Vec2(3, 4);
     * vec.length = 10;
     *
     * console.log(vec.toString()); // (6, 8)
     */
    set length(value) {
        const currentLength = this.length;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.values[0] *= scale;
        this.values[1] *= scale;
    }
    /**
     * @alias length
     * @returns 벡터의 크기를 반환합니다.
     */
    get magnitude() {
        return Math.hypot(this.values[0], this.values[1]);
    }
    /**
     * @alias length
     * @param value 벡터의 크기
     * @example
     * const vec = new Vec2(3, 4);
     * vec.magnitude = 10;
     *
     * console.log(vec.toString()); // (6, 8)
     */
    set magnitude(value) {
        const currentLength = this.magnitude;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.values[0] *= scale;
        this.values[1] *= scale;
    }
    /**
     * @alias taxicabLength
     * @returns 벡터의 맨해튼 거리를 반환합니다.
     */
    get manhattanLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]);
    }
    /**
     * @alias manhattanLength
     * @returns 벡터의 택시캡 거리를 반환합니다.
     */
    get taxicabLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]);
    }
    /**
     * @returns 벡터를 복사한 새로운 Vec2 객체를 반환합니다.
     */
    get clone() {
        return new Vec2(this.values[0], this.values[1]);
    }
    /**
     * @returns 벡터를 정규화한 새로운 Vec2 객체를 반환합니다.
     */
    get normalized() {
        const length = this.length;
        if (length === 0)
            return Vec2.zero;
        return new Vec2(this.values[0] / length, this.values[1] / length);
    }
    /**
     * @returns 벡터를 수직으로 회전한 새로운 Vec2 객체를 반환합니다.
     */
    get perpendicular() {
        return new Vec2(-this.values[1], this.values[0]);
    }
    /**
     * @returns 벡터의 각도를 반환합니다.
     */
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get x() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set x(value) {
        this.values[0] = value;
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get [0]() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set [0](value) {
        this.values[0] = value;
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
     */
    get y() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
     */
    set y(value) {
        this.values[1] = value;
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
     */
    get [1]() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
     */
    set [1](value) {
        this.values[1] = value;
    }
    /**
     * @param vec 더할 벡터
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    add(vec) {
        this.values[0] += vec.x;
        this.values[1] += vec.y;
        return this;
    }
    /**
     * @param scalar 더할 스칼라
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addScalar(scalar) {
        this.values[0] += scalar;
        this.values[1] += scalar;
        return this;
    }
    /**
     * @param arr 더할 배열
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addArray(arr) {
        this.values[0] += arr[0];
        this.values[1] += arr[1];
        return this;
    }
    /**
     * @param vec 뺄 벡터
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    sub(vec) {
        this.values[0] -= vec.x;
        this.values[1] -= vec.y;
        return this;
    }
    /**
     * @param scalar 뺄 스칼라
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subScalar(scalar) {
        this.values[0] -= scalar;
        this.values[1] -= scalar;
        return this;
    }
    /**
     * @param arr 뺄 배열
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subArray(arr) {
        this.values[0] -= arr[0];
        this.values[1] -= arr[1];
        return this;
    }
    /**
     * @param vec 곱할 벡터
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mul(vec) {
        this.values[0] *= vec.x;
        this.values[1] *= vec.y;
        return this;
    }
    /**
     * @param scalar 곱할 스칼라
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulScalar(scalar) {
        this.values[0] *= scalar;
        this.values[1] *= scalar;
        return this;
    }
    /**
     * @param arr 곱할 배열
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulArray(arr) {
        this.values[0] *= arr[0];
        this.values[1] *= arr[1];
        return this;
    }
    /**
     * @param vec 나눌 벡터
     * @returns 원본 벡터에서 값을 나눈 후 반환합니다.
     */
    div(vec) {
        this.values[0] /= vec.x;
        this.values[1] /= vec.y;
        return this;
    }
    /**
     * @param scalar 나눌 스칼라
     * @returns 원본 벡터에서 값을 나눈 후 반환합니다.
     */
    divScalar(scalar) {
        this.values[0] /= scalar;
        this.values[1] /= scalar;
        return this;
    }
    /**
     * @param arr 나눌 배열
     * @returns 원본 벡터에서 값을 나눈 후 반환합니다.
     */
    divArray(arr) {
        this.values[0] /= arr[0];
        this.values[1] /= arr[1];
        return this;
    }
    /**
     * @param vec 나머지를 구할 벡터
     * @returns 원본 벡터에서 벡터와의 나머지를 구한 후 반환합니다.
     */
    mod(vec) {
        this.values[0] %= vec.x;
        this.values[1] %= vec.y;
        return this;
    }
    /**
     * @param scalar 나머지를 구할 스칼라
     * @returns 원본 벡터에서 스칼라와의 나머지를 구한 후 반환합니다.
     */
    modScalar(scalar) {
        this.values[0] %= scalar;
        this.values[1] %= scalar;
        return this;
    }
    /**
     * @param arr 나머지를 구할 배열
     * @returns 원본 벡터에서 배열과의 나머지를 구한 후 반환합니다.
     */
    modArray(arr) {
        this.values[0] %= arr[0];
        this.values[1] %= arr[1];
        return this;
    }
    /**
     * @param vec 내적할 벡터
     * @returns 두 벡터의 내적을 반환합니다.
     */
    dot(vec) {
        return this.values[0] * vec.x + this.values[1] * vec.y;
    }
    /**
     * @param vec 외적할 벡터
     * @returns 두 벡터의 외적을 반환합니다.
     */
    cross(vec) {
        return this.values[0] * vec.y - this.values[1] * vec.x;
    }
    /**
     * @param radians 회전할 각도
     * @returns 원본 벡터를 회전한 후 반환합니다.
     */
    rotate(radians) {
        const x = this.values[0];
        const y = this.values[1];
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.values[0] = x * cos - y * sin;
        this.values[1] = x * sin + y * cos;
        return this;
    }
    /**
     * @param center 중심점
     * @param radians 회전할 각도
     * @returns 원본 벡터를 중심점을 기준으로 회전한 후 반환합니다.
     */
    rotateAround(center, radians) {
        const x = this.values[0] - center.x;
        const y = this.values[1] - center.y;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.values[0] = x * cos - y * sin + center.x;
        this.values[1] = x * sin + y * cos + center.y;
        return this;
    }
    /**
     * @param digits 반올림할 자릿수
     * @returns 원본 벡터를 반올림한 후 반환합니다.
     * @example
     * const vec = new Vec2(3.14159, 2.71828);
     * vec.round(2);
     *
     * console.log(vec.toString()); // (3.14, 2.72)
     */
    round(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.round(this.values[0] * pow) / pow;
        this.values[1] = Math.round(this.values[1] * pow) / pow;
        return this;
    }
    /**
     * @param digits 내림할 자릿수
     * @returns 원본 벡터를 내림한 후 반환합니다.
     * @example
     * const vec = new Vec2(3.14159, 2.71828);
     * vec.floor(2);
     *
     * console.log(vec.toString()); // (3.14, 2.71)
     */
    floor(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.floor(this.values[0] * pow) / pow;
        this.values[1] = Math.floor(this.values[1] * pow) / pow;
        return this;
    }
    /**
     * @param digits 올림할 자릿수
     * @returns 원본 벡터를 올림한 후 반환합니다.
     * @example
     * const vec = new Vec2(3.14159, 2.71828);
     * vec.ceil(2);
     *
     * console.log(vec.toString()); // (3.15, 2.72)
     */
    ceil(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.ceil(this.values[0] * pow) / pow;
        this.values[1] = Math.ceil(this.values[1] * pow) / pow;
        return this;
    }
    /**
     * @param digits 버릴 자릿수
     * @returns 원본 벡터를 버린 후 반환합니다.
     * @example
     * const vec = new Vec2(3.14159, 2.71828);
     * vec.trunc(2);
     *
     * console.log(vec.toString()); // (3.14, 2.71)
     */
    trunc(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.trunc(this.values[0] * pow) / pow;
        this.values[1] = Math.trunc(this.values[1] * pow) / pow;
        return this;
    }
    /**
     * @returns 원본 벡터의 요소를 절댓값으로 변경한 후 반환합니다.
     */
    abs() {
        this.values[0] = Math.abs(this.values[0]);
        this.values[1] = Math.abs(this.values[1]);
        return this;
    }
    /**
     * @param func 적용할 함수
     * @returns 원본 벡터의 요소에 함수를 적용한 후 반환합니다.
     */
    do(func) {
        this.values[0] = func(this.values[0]);
        this.values[1] = func(this.values[1]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 min연산을 수행합니다.
     */
    min(vec) {
        this.values[0] = Math.min(this.values[0], vec.x);
        this.values[1] = Math.min(this.values[1], vec.y);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 min연산을 수행합니다.
     */
    minScalar(scalar) {
        this.values[0] = Math.min(this.values[0], scalar);
        this.values[1] = Math.min(this.values[1], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 min연산을 수행합니다.
     */
    minArr(arr) {
        this.values[0] = Math.min(this.values[0], arr[0]);
        this.values[1] = Math.min(this.values[1], arr[1]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 max연산을 수행합니다.
     */
    max(vec) {
        this.values[0] = Math.max(this.values[0], vec.x);
        this.values[1] = Math.max(this.values[1], vec.y);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 max연산을 수행합니다.
     */
    maxScalar(scalar) {
        this.values[0] = Math.max(this.values[0], scalar);
        this.values[1] = Math.max(this.values[1], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 max연산을 수행합니다.
     */
    maxArr(arr) {
        this.values[0] = Math.max(this.values[0], arr[0]);
        this.values[1] = Math.max(this.values[1], arr[1]);
        return this;
    }
    /**
     * @param min 최소 벡터
     * @param max 최대 벡터
     * @returns 원본 벡터의 요소를 최소 벡터와 최대 벡터 사이의 값으로 클램프한 후 반환합니다.
     */
    clamp(min, max) {
        this.values[0] = Math.max(min.x, Math.min(max.x, this.values[0]));
        this.values[1] = Math.max(min.y, Math.min(max.y, this.values[1]));
        return this;
    }
    /**
     * @param min 최소 스칼라
     * @param max 최대 스칼라
     * @returns 원본 벡터의 요소를 최소 스칼라와 최대 스칼라 사이의 값으로 클램프한 후 반환합니다.
     */
    clampScalar(min, max) {
        this.values[0] = Math.max(min, Math.min(max, this.values[0]));
        this.values[1] = Math.max(min, Math.min(max, this.values[1]));
        return this;
    }
    /**
     * @param min 최소 배열
     * @param max 최대 배열
     * @returns 원본 벡터의 요소를 최소 배열과 최대 배열 사이의 값으로 클램프한 후 반환합니다.
     */
    clampArr(min, max) {
        this.values[0] = Math.max(min[0], Math.min(max[0], this.values[0]));
        this.values[1] = Math.max(min[1], Math.min(max[1], this.values[1]));
        return this;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리의 제곱을 반환합니다.
     */
    distanceSquared(vec) {
        const dx = this.values[0] - vec.x;
        const dy = this.values[1] - vec.y;
        return dx * dx + dy * dy;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리를 반환합니다.
     */
    distance(vec) {
        return Math.hypot(this.values[0] - vec.x, this.values[1] - vec.y);
    }
    /**
     * @alias taxicabDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 맨해튼 거리를 반환합니다.
     */
    manhattanDistance(vec) {
        return (Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y));
    }
    /**
     * @alias manhattanDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 택시캡 거리를 반환합니다.
     */
    taxicabDistance(vec) {
        return (Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y));
    }
    /**
     * @returns 원본 벡터를 정규화한 후 반환합니다.
     */
    normalize() {
        const length = this.length;
        if (length === 0)
            return this;
        this.values[0] /= length;
        this.values[1] /= length;
        return this;
    }
    /**
     * @returns 원본 벡터의 요소를 반대로 변경한 후 반환합니다.
     */
    negate() {
        this.values[0] = -this.values[0];
        this.values[1] = -this.values[1];
        return this;
    }
    /**
     * @param vec 목표 벡터
     * @param t 진행도
     * @returns 원본 벡터를 목표 벡터로 선형 보간한 후 반환합니다.
     */
    lerp(vec, t) {
        this.values[0] += (vec.x - this.values[0]) * t;
        this.values[1] += (vec.y - this.values[1]) * t;
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 두 벡터가 같은지 비교합니다.
     */
    equals(vec) {
        return this.values[0] === vec.x && this.values[1] === vec.y;
    }
    /**
     * @returns 벡터를 문자열 형태로 반환합니다.
     */
    toString() {
        return `(${this.values[0]}, ${this.values[1]})`;
    }
    /**
     * @returns 벡터를 객체 형태로 반환합니다.
     */
    toObject() {
        return { x: this.values[0], y: this.values[1] };
    }
    /**
     * @returns 벡터를 배열 형태로 반환합니다.
     */
    toArray() {
        return [this.values[0], this.values[1]];
    }
    /**
     * @returns 벡터를 JSON 형태로 변환합니다.
     */
    toJSON() {
        return { x: this.values[0], y: this.values[1] };
    }
}

;// ./node_modules/vecs-ts/dist/vec3.js


class Vec3 {
    constructor(x, y, z) {
        this.values = new Float64Array(3).fill(0);
        this.values[0] = x;
        this.values[1] = y;
        this.values[2] = z;
    }
    static from(vec) {
        return new Vec3(vec.x, vec.y, vec.z ?? 0);
    }
    static fromScalar(scalar) {
        return new Vec3(scalar, scalar, scalar);
    }
    static fromArray(arr) {
        return new Vec3(arr[0], arr[1], arr[2] ?? 0);
    }
    static fromString(str) {
        const [x, y, z] = str.slice(1, -1).split(", ").map(parseFloat);
        return new Vec3(x, y, z);
    }
    /**
     * 두 벡터를 더한 새로운 Vec3 객체를 반환합니다.
     * @param a 더할 벡터
     * @param b 더할 벡터
     * @returns 두 벡터를 더한 새로운 Vec3 객체
     */
    static add(a, b) {
        return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
    }
    /**
     * 두 벡터를 뺀 새로운 Vec3 객체를 반환합니다.
     * @param a 벡터
     * @param b 빼는 벡터
     * @returns 두 벡터를 뺀 새로운 Vec3 객체
     */
    static sub(a, b) {
        return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    }
    /**
     * 두 벡터를 곱한 새로운 Vec3 객체를 반환합니다.
     * @param a 곱할 벡터
     * @param b 곱할 벡터
     * @returns 두 벡터를 곱한 새로운 Vec3 객체
     */
    static mul(a, b) {
        return new Vec3(a.x * b.x, a.y * b.y, a.z * b.z);
    }
    /**
     * 두 벡터를 나눈 새로운 Vec3 객체를 반환합니다.
     * @param a 나눌 벡터
     * @param b 나눌 벡터
     * @returns 두 벡터를 나눈 새로운 Vec3 객체
     */
    static div(a, b) {
        return new Vec3(a.x / b.x, a.y / b.y, a.z / b.z);
    }
    /**
     * 두 벡터의 나머지를 구한 새로운 Vec3 객체를 반환합니다.
     * @param a 나머지를 구할 벡터
     * @param b 나머지를 구할 벡터
     * @returns 두 벡터의 나머지를 구한 새로운 Vec3 객체
     */
    static mod(a, b) {
        return new Vec3(a.x % b.x, a.y % b.y, a.z % b.z);
    }
    /**
     * 두 벡터의 내적을 반환합니다.
     * @param a 내적할 벡터
     * @param b 내적할 벡터
     * @returns 두 벡터의 내적
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    /**
     * 두 벡터의 외적을 구한 새로운 Vec3 객체를 반환합니다.
     * @param a 외적할 벡터
     * @param b 외적할 벡터
     * @returns 두 벡터의 외적을 구한 새로운 Vec3 객체
     */
    static cross(a, b) {
        return new Vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }
    /**
     * 두 벡터 사이의 거리를 반환합니다.
     * @param a 거리 구할 벡터
     * @param b 거리 구할 벡터
     * @returns 두 벡터 사이의 거리
     */
    static distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    }
    /**
     * 두 벡터 사이의 거리 제곱을 반환합니다.
     * @param a 거리 제곱 구할 벡터
     * @param b 거리 제곱 구할 벡터
     * @returns 두 벡터 사이의 거리 제곱
     */
    static distanceSquared(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return dx * dx + dy * dy + dz * dz;
    }
    /**
     * 두 벡터 사이의 맨해튼 거리를 반환합니다.
     * @param a 맨해튼 거리 구할 벡터
     * @param b 맨해튼 거리 구할 벡터
     * @returns 두 벡터 사이의 맨해튼 거리
     */
    static distanceManhattan(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
    }
    /**
     * 두 벡터 사이의 택시캡 거리를 반환합니다.
     * @param a 택시캡 거리 구할 벡터
     * @param b 택시캡 거리 구할 벡터
     * @returns 두 벡터 사이의 택시캡 거리
     */
    static distanceTaxicab(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
    }
    *[Symbol.iterator]() {
        yield* this.values;
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case "number":
                return this.length;
            case "string":
            default:
                return this.toString();
        }
    }
    /**
     * @returns 영벡터를 반환합니다.
     */
    static get zero() {
        return new Vec3(0, 0, 0);
    }
    /**
     * @returns 모든 요소가 1인 벡터를 반환합니다.
     */
    static get one() {
        return new Vec3(1, 1, 1);
    }
    /**
     * @returns x요소가 1인 벡터를 반환합니다.
     */
    static get east() {
        return new Vec3(1, 0, 0);
    }
    /**
     * @returns x요소가 -1인 벡터를 반환합니다.
     */
    static get west() {
        return new Vec3(-1, 0, 0);
    }
    /**
     * @returns y요소가 1인 벡터를 반환합니다.
     */
    static get above() {
        return new Vec3(0, 1, 0);
    }
    /**
     * @returns y요소가 -1인 벡터를 반환합니다.
     */
    static get below() {
        return new Vec3(0, -1, 0);
    }
    /**
     * @returns z요소가 1인 벡터를 반환합니다.
     */
    static get north() {
        return new Vec3(0, 0, 1);
    }
    /**
     * @returns z요소가 -1인 벡터를 반환합니다.
     */
    static get south() {
        return new Vec3(0, 0, -1);
    }
    /**
     * @returns 벡터의 길이의 제곱을 반환합니다.
     */
    get lengthSquared() {
        return this.values[0] * this.values[0] + this.values[1] * this.values[1] + this.values[2] * this.values[2];
    }
    /**
     * @alias magnitude
     * @returns 벡터의 크기를 반환합니다.
     */
    get length() {
        return Math.hypot(this.values[0], this.values[1], this.values[2]);
    }
    /**
     * @alias magnitude
     * @param value 벡터의 크기
     */
    set length(value) {
        const currentLength = this.length;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.values[0] *= scale;
        this.values[1] *= scale;
        this.values[2] *= scale;
    }
    /**
     * @alias length
     * @returns 벡터의 크기를 반환합니다.
     */
    get magnitude() {
        return Math.hypot(this.values[0], this.values[1], this.values[2]);
    }
    /**
     * @alias length
     * @param value 벡터의 크기
     */
    set magnitude(value) {
        const currentLength = this.magnitude;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.values[0] *= scale;
        this.values[1] *= scale;
        this.values[2] *= scale;
    }
    /**
     * @alias taxicabLength
     * @returns 벡터의 맨해튼 거리를 반환합니다.
     */
    get manhattanLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]) + Math.abs(this.values[2]);
    }
    /**
     * @alias manhattanLength
     * @returns 벡터의 택시캡 거리를 반환합니다.
     */
    get taxicabLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]) + Math.abs(this.values[2]);
    }
    /**
     * @returns 벡터를 복사한 새로운 Vec3 객체를 반환합니다.
     */
    get clone() {
        return new Vec3(this.values[0], this.values[1], this.values[2]);
    }
    /**
     * @returns 벡터를 정규화한 새로운 Vec3 객체를 반환합니다.
     */
    get normalized() {
        const length = this.length;
        if (length === 0)
            return Vec3.zero;
        return new Vec3(this.values[0] / length, this.values[1] / length, this.values[2] / length);
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get x() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set x(value) {
        this.values[0] = value;
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get [0]() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set [0](value) {
        this.values[0] = value;
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
    */
    get y() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
    */
    set y(value) {
        this.values[1] = value;
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
    */
    get [1]() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
    */
    set [1](value) {
        this.values[1] = value;
    }
    /**
     * @returns 벡터의 z값을 반환합니다.
    */
    get z() {
        return this.values[2];
    }
    /**
     * @param value 벡터의 z값
    */
    set z(value) {
        this.values[2] = value;
    }
    /**
     * @returns 벡터의 z값을 반환합니다.
    */
    get [2]() {
        return this.values[2];
    }
    /**
     * @param value 벡터의 z값
    */
    set [2](value) {
        this.values[2] = value;
    }
    /**
     * @param vec 더할 벡터
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    add(vec) {
        this.values[0] += vec.x;
        this.values[1] += vec.y;
        this.values[2] += vec.z ?? 0;
        return this;
    }
    /**
     * @param scalar 더할 스칼라
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addScalar(scalar) {
        this.values[0] += scalar;
        this.values[1] += scalar;
        this.values[2] += scalar;
        return this;
    }
    /**
     * @param arr 더할 배열
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addArray(arr) {
        this.values[0] += arr[0];
        this.values[1] += arr[1];
        this.values[2] += arr[2] ?? 0;
        return this;
    }
    /**
     * @param vec 뺄 벡터
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    sub(vec) {
        this.values[0] -= vec.x;
        this.values[1] -= vec.y;
        this.values[2] -= vec.z ?? 0;
        return this;
    }
    /**
     * @param scalar 뺄 스칼라
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subScalar(scalar) {
        this.values[0] -= scalar;
        this.values[1] -= scalar;
        this.values[2] -= scalar;
        return this;
    }
    /**
     * @param arr 뺄 배열
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subArray(arr) {
        this.values[0] -= arr[0];
        this.values[1] -= arr[1];
        this.values[2] -= arr[2] ?? 0;
        return this;
    }
    /**
     * @param vec 곱할 벡터
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mul(vec) {
        this.values[0] *= vec.x;
        this.values[1] *= vec.y;
        this.values[2] *= vec.z ?? 1;
        return this;
    }
    /**
     * @param scalar 곱할 스칼라
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulScalar(scalar) {
        this.values[0] *= scalar;
        this.values[1] *= scalar;
        this.values[2] *= scalar;
        return this;
    }
    /**
     * @param arr 곱할 배열
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulArray(arr) {
        this.values[0] *= arr[0];
        this.values[1] *= arr[1];
        this.values[2] *= arr[2] ?? 1;
        return this;
    }
    /**
     * @param vec 나눌 벡터
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    div(vec) {
        this.values[0] /= vec.x;
        this.values[1] /= vec.y;
        this.values[2] /= vec.z ?? 1;
        return this;
    }
    /**
     * @param scalar 나눌 스칼라
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    divScalar(scalar) {
        this.values[0] /= scalar;
        this.values[1] /= scalar;
        this.values[2] /= scalar;
        return this;
    }
    /**
     * @param arr 나눌 배열
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    divArray(arr) {
        this.values[0] /= arr[0];
        this.values[1] /= arr[1];
        this.values[2] /= arr[2] ?? 1;
        return this;
    }
    /**
     * @param vec 나머지를 구할 벡터
     * @returns 원본 벡터에서 벡터와의 나머지를 구한 후 반환합니다.
     */
    mod(vec) {
        this.values[0] %= vec.x;
        this.values[1] %= vec.y;
        this.values[2] %= vec.z ?? 1;
        return this;
    }
    /**
     * @param scalar 나머지를 구할 스칼라
     * @returns 원본 벡터에서 스칼라와의 나머지를 구한 후 반환합니다.
     */
    modScalar(scalar) {
        this.values[0] %= scalar;
        this.values[1] %= scalar;
        this.values[2] %= scalar;
        return this;
    }
    /**
     * @param arr 나머지를 구할 배열
     * @returns 원본 벡터에서 배열과의 나머지를 구한 후 반환합니다.
     */
    modArray(arr) {
        this.values[0] %= arr[0];
        this.values[1] %= arr[1];
        this.values[2] %= arr[2] ?? 1;
        return this;
    }
    /**
     * @param vec 내적할 벡터
     * @returns 두 벡터의 내적을 반환합니다.
     */
    dot(vec) {
        return this.values[0] * vec.x + this.values[1] * vec.y + this.values[2] * (vec.z ?? 0);
    }
    /**
     * @param vec 외적할 벡터
     * @returns 두 벡터의 외적을 반환합니다.
     */
    cross(vec) {
        const { x, y, z } = this;
        const vx = vec.x;
        const vy = vec.y;
        const vz = vec.z ?? 0;
        this.x = y * vz - z * vy;
        this.y = z * vx - x * vz;
        this.z = x * vy - y * vx;
        return this;
    }
    /**
     * @param u 회전 축
     * @param radians 회전 각도
     * @returns 원본 벡터를 주어진 축으로 주어진 각도만큼 회전한 후 반환합니다.
     */
    rotationFromQuaternion(u, radians) {
        const v = new Quat(this.values[0], this.values[1], this.values[2], 0);
        const radianHalf = radians / 2;
        const sin = Math.sin(radianHalf);
        const cos = Math.cos(radianHalf);
        const q = new Quat(u.x * sin, u.y * sin, u.z * sin, cos).normalized;
        const qConjugate = q.conjugate;
        const rotated = q.mul(v).mul(qConjugate);
        this.values[0] = rotated.x;
        this.values[1] = rotated.y;
        this.values[2] = rotated.z;
        return this;
    }
    /**
     * @param euler 각 축의 회전 각도
     * @param priority 회전 우선순위
     * @returns 원본 벡터를 주어진 각도만큼 회전한 후 반환합니다.
     */
    rotationFromEuler(euler, priority) {
        const { x, y, z } = euler;
        const cx = Math.cos(x / 2);
        const cy = Math.cos(y / 2);
        const cz = Math.cos(z / 2);
        const sx = Math.sin(x / 2);
        const sy = Math.sin(y / 2);
        const sz = Math.sin(z / 2);
        const qx = new Quat(sx, 0, 0, cx);
        const qy = new Quat(0, sy, 0, cy);
        const qz = new Quat(0, 0, sz, cz);
        let q;
        switch (priority) {
            case RotationPriority.XYZ:
                q = qz.mul(qy).mul(qx);
                break;
            case RotationPriority.XZY:
                q = qy.mul(qz).mul(qx);
                break;
            case RotationPriority.YXZ:
                q = qz.mul(qx).mul(qy);
                break;
            case RotationPriority.YZX:
                q = qx.mul(qz).mul(qy);
                break;
            case RotationPriority.ZXY:
                q = qy.mul(qx).mul(qz);
                break;
            case RotationPriority.ZYX:
                q = qx.mul(qy).mul(qz);
                break;
            default:
                throw new Error("Invalid rotation priority");
        }
        const v = new Quat(this.values[0], this.values[1], this.values[2], 0);
        const qConjugate = q.conjugate;
        const rotated = q.mul(v).mul(qConjugate);
        this.values[0] = rotated.x;
        this.values[1] = rotated.y;
        this.values[2] = rotated.z;
        return this;
    }
    /**
     * @param radians x축 회전 각도
     * @returns 원본 벡터를 x축으로 주어진 각도만큼 회전한 후 반환합니다.
     */
    rotateX(radians) {
        const { y, z } = this;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.y = y * cos - z * sin;
        this.z = y * sin + z * cos;
        return this;
    }
    /**
     * @param radians y축 회전 각도
     * @returns 원본 벡터를 y축으로 주어진 각도만큼 회전한 후 반환합니다.
     */
    rotateY(radians) {
        const { x, z } = this;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.x = x * cos - z * sin;
        this.z = x * sin + z * cos;
        return this;
    }
    /**
     * @param radians z축 회전 각도
     * @returns 원본 벡터를 z축으로 주어진 각도만큼 회전한 후 반환합니다.
     */
    rotateZ(radians) {
        const { x, y } = this;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        return this;
    }
    /**
     * @param digits 반올림할 자릿수
     * @returns 원본 벡터를 반올림한 후 반환합니다.
     */
    round(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.round(this.values[0] * pow) / pow;
        this.values[1] = Math.round(this.values[1] * pow) / pow;
        this.values[2] = Math.round(this.values[2] * pow) / pow;
        return this;
    }
    /**
     * @param digits 내림할 자릿수
     * @returns 원본 벡터를 내림한 후 반환합니다.
     */
    floor(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.floor(this.values[0] * pow) / pow;
        this.values[1] = Math.floor(this.values[1] * pow) / pow;
        this.values[2] = Math.floor(this.values[2] * pow) / pow;
        return this;
    }
    /**
     * @param digits 올림할 자릿수
     * @returns 원본 벡터를 올림한 후 반환합니다.
     */
    ceil(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.ceil(this.values[0] * pow) / pow;
        this.values[1] = Math.ceil(this.values[1] * pow) / pow;
        this.values[2] = Math.ceil(this.values[2] * pow) / pow;
        return this;
    }
    /**
     * @param digits 버릴 자릿수
     * @returns 원본 벡터를 버린 후 반환합니다.
     */
    trunc(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.trunc(this.values[0] * pow) / pow;
        this.values[1] = Math.trunc(this.values[1] * pow) / pow;
        this.values[2] = Math.trunc(this.values[2] * pow) / pow;
        return this;
    }
    /**
     * @returns 원본 벡터의 요소를 절댓값으로 변경한 후 반환합니다.
     */
    abs() {
        this.values[0] = Math.abs(this.values[0]);
        this.values[1] = Math.abs(this.values[1]);
        this.values[2] = Math.abs(this.values[2]);
        return this;
    }
    /**
     * @param func 적용할 함수
     * @returns 원본 벡터의 요소에 함수를 적용한 후 반환합니다.
     */
    do(func) {
        this.values[0] = func(this.values[0]);
        this.values[1] = func(this.values[1]);
        this.values[2] = func(this.values[2]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 min연산을 수행합니다.
     */
    min(vec) {
        this.values[0] = Math.min(this.values[0], vec.x);
        this.values[1] = Math.min(this.values[1], vec.y);
        this.values[2] = Math.min(this.values[2], vec.z);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 min연산을 수행합니다.
     */
    minScalar(scalar) {
        this.values[0] = Math.min(this.values[0], scalar);
        this.values[1] = Math.min(this.values[1], scalar);
        this.values[2] = Math.min(this.values[2], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 min연산을 수행합니다.
     */
    minArr(arr) {
        this.values[0] = Math.min(this.values[0], arr[0]);
        this.values[1] = Math.min(this.values[1], arr[1]);
        this.values[2] = Math.min(this.values[2], arr[2]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 max연산을 수행합니다.
     */
    max(vec) {
        this.values[0] = Math.max(this.values[0], vec.x);
        this.values[1] = Math.max(this.values[1], vec.y);
        this.values[2] = Math.max(this.values[2], vec.z);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 max연산을 수행합니다.
     */
    maxScalar(scalar) {
        this.values[0] = Math.max(this.values[0], scalar);
        this.values[1] = Math.max(this.values[1], scalar);
        this.values[2] = Math.max(this.values[2], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 max연산을 수행합니다.
     */
    maxArr(arr) {
        this.values[0] = Math.max(this.values[0], arr[0]);
        this.values[1] = Math.max(this.values[1], arr[1]);
        this.values[2] = Math.max(this.values[2], arr[2]);
        return this;
    }
    /**
     * @param min 최소 벡터
     * @param max 최대 벡터
     * @returns 원본 벡터의 요소를 최소 벡터와 최대 벡터 사이의 값으로 클램프한 후 반환합니다.
     */
    clamp(min, max) {
        this.values[0] = Math.max(min.x, Math.min(max.x, this.values[0]));
        this.values[1] = Math.max(min.y, Math.min(max.y, this.values[1]));
        this.values[2] = Math.max(min.z, Math.min(max.z, this.values[2]));
        return this;
    }
    /**
     * @param min 최소 스칼라
     * @param max 최대 스칼라
     * @returns 원본 벡터의 요소를 최소 스칼라와 최대 스칼라 사이의 값으로 클램프한 후 반환합니다.
     */
    clampScalar(min, max) {
        this.values[0] = Math.max(min, Math.min(max, this.values[0]));
        this.values[1] = Math.max(min, Math.min(max, this.values[1]));
        this.values[2] = Math.max(min, Math.min(max, this.values[2]));
        return this;
    }
    /**
     * @param min 최소 배열
     * @param max 최대 배열
     * @returns 원본 벡터의 요소를 최소 배열과 최대 배열 사이의 값으로 클램프한 후 반환합니다.
     */
    clampArr(min, max) {
        this.values[0] = Math.max(min[0], Math.min(max[0], this.values[0]));
        this.values[1] = Math.max(min[1], Math.min(max[1], this.values[1]));
        this.values[2] = Math.max(min[2], Math.min(max[2], this.values[2]));
        return this;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리의 제곱을 반환합니다.
     */
    distanceSquared(vec) {
        const dx = this.values[0] - vec.x;
        const dy = this.values[1] - vec.y;
        const dz = this.values[2] - vec.z;
        return dx * dx + dy * dy + dz * dz;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리를 반환합니다.
     */
    distance(vec) {
        return Math.hypot(this.values[0] - vec.x, this.values[1] - vec.y, this.values[2] - vec.z);
    }
    /**
     * @alias taxicabDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 맨해튼 거리를 반환합니다.
     */
    manhattanDistance(vec) {
        return Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y) + Math.abs(this.values[2] - vec.z);
    }
    /**
     * @alias manhattanDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 택시캡 거리를 반환합니다.
     */
    taxicabDistance(vec) {
        return Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y) + Math.abs(this.values[2] - vec.z);
    }
    /**
     * @returns 원본 벡터를 정규화한 후 반환합니다.
     */
    normalize() {
        const length = this.length;
        if (length === 0)
            return this;
        this.values[0] /= length;
        this.values[1] /= length;
        this.values[2] /= length;
        return this;
    }
    /**
     * @returns 원본 벡터의 요소를 반대로 변경한 후 반환합니다.
     */
    negate() {
        this.values[0] = -this.values[0];
        this.values[1] = -this.values[1];
        this.values[2] = -this.values[2];
        return this;
    }
    /**
     * @param vec 목표 벡터
     * @param t 진행도
     * @returns 원본 벡터를 목표 벡터로 선형 보간한 후 반환합니다.
     */
    lerp(vec, t) {
        this.values[0] += (vec.x - this.values[0]) * t;
        this.values[1] += (vec.y - this.values[1]) * t;
        this.values[2] += (vec.z - this.values[2]) * t;
        return this;
    }
    /**
     * @param vec 목표 벡터
     * @param t 진행도
     * @returns 원본 벡터를 목표 벡터로 구형 보간한 후 반환합니다.
     */
    slerp(v, t) {
        const vector = new Vec3(v.x, v.y, v.z);
        const dot = this.normalized.dot(vector.normalized);
        const theta = Math.acos(dot) * t;
        const surface = this.clone.cross(v).normalized;
        const rotated = this.rotationFromQuaternion(surface, theta);
        this.x = rotated.x;
        this.y = rotated.y;
        this.z = rotated.z;
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 두 벡터가 같은지 비교합니다.
     */
    equals(vec) {
        return this.values[0] === vec.x && this.values[1] === vec.y && this.values[2] === vec.z;
    }
    /**
     * @returns 벡터를 문자열 형태로 반환합니다.
     */
    toString() {
        return `(${this.values[0]}, ${this.values[1]}, ${this.values[2]})`;
    }
    /**
     * @returns 벡터를 객체 형태로 반환합니다.
     */
    toObject() {
        return { x: this.values[0], y: this.values[1], z: this.values[2] };
    }
    /**
     * @returns 벡터를 배열 형태로 반환합니다.
     */
    toArray() {
        return [this.values[0], this.values[1], this.values[2]];
    }
    /**
     * @returns 벡터를 JSON 형태로 변환합니다.
     */
    toJSON() {
        return { x: this.values[0], y: this.values[1], z: this.values[2] };
    }
}

;// ./node_modules/vecs-ts/dist/vec4.js
class Vec4 {
    constructor(x, y, z, w) {
        this.values = new Float64Array(4).fill(0);
        this.values[0] = x;
        this.values[1] = y;
        this.values[2] = z;
        this.values[3] = w;
    }
    static from(vec) {
        return new Vec4(vec.x, vec.y, vec.z ?? 0, vec.w ?? 0);
    }
    static fromScalar(scalar) {
        return new Vec4(scalar, scalar, scalar, scalar);
    }
    static fromArray(arr) {
        return new Vec4(arr[0], arr[1], arr[2] ?? 0, arr[3] ?? 0);
    }
    static fromString(str) {
        const [x, y, z, w] = str.slice(1, -1).split(", ").map(parseFloat);
        return new Vec4(x, y, z, w);
    }
    /**
     * 두 벡터를 더한 새로운 Vec4 객체를 반환합니다.
     * @param a 더할 벡터
     * @param b 더할 벡터
     * @returns 두 벡터를 더한 새로운 Vec4 객체
     */
    static add(a, b) {
        return new Vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    }
    /**
     * 두 벡터를 뺀 새로운 Vec4 객체를 반환합니다.
     * @param a 벡터
     * @param b 빼는 벡터
     * @returns 두 벡터를 뺀 새로운 Vec4 객체
     */
    static sub(a, b) {
        return new Vec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }
    /**
     * 두 벡터를 곱한 새로운 Vec4 객체를 반환합니다.
     * @param a 곱할 벡터
     * @param b 곱할 벡터
     * @returns 두 벡터를 곱한 새로운 Vec4 객체
     */
    static mul(a, b) {
        return new Vec4(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
    }
    /**
     * 두 벡터를 나눈 새로운 Vec4 객체를 반환합니다.
     * @param a 나눌 벡터
     * @param b 나눌 벡터
     * @returns 두 벡터를 나눈 새로운 Vec4 객체
     */
    static div(a, b) {
        return new Vec4(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
    }
    /**
     * 두 벡터의 나머지를 구한 새로운 Vec4 객체를 반환합니다.
     * @param a 나머지를 구할 벡터
     * @param b 나머지를 구할 벡터
     * @returns 두 벡터의 나머지를 구한 새로운 Vec4 객체
     */
    static mod(a, b) {
        return new Vec4(a.x % b.x, a.y % b.y, a.z % b.z, a.w % b.w);
    }
    /**
     * 두 벡터의 내적을 구한 새로운 Vec4 객체를 반환합니다.
     * @param a 내적할 벡터
     * @param b 내적할 벡터
     * @returns 두 벡터의 내적을 구한 새로운 Vec4 객체
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }
    /**
     * 두 벡터의 거리를 반환합니다.
     * @param a 거리를 구할 벡터
     * @param b 거리를 구할 벡터
     * @returns 두 벡터의 거리
     */
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const dw = a.w - b.w;
        return Math.hypot(dx, dy, dz, dw);
    }
    /**
     * 두 벡터의 거리의 제곱을 반환합니다.
     * @param a 거리의 제곱을 구할 벡터
     * @param b 거리의 제곱을 구할 벡터
     * @returns 두 벡터의 거리의 제곱
     */
    static distanceSquared(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const dw = a.w - b.w;
        return dx * dx + dy * dy + dz * dz + dw * dw;
    }
    /**
     * 두 벡터의 맨해튼 거리를 반환합니다.
     * @param a 맨해튼 거리를 구할 벡터
     * @param b 맨해튼 거리를 구할 벡터
     * @returns 두 벡터의 맨해튼 거리
     */
    static distanceManhattan(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) + Math.abs(a.w - b.w);
    }
    /**
     * 두 벡터의 택시캡 거리를 반환합니다.
     * @param a 택시캡 거리를 구할 벡터
     * @param b 택시캡 거리를 구할 벡터
     * @returns 두 벡터의 택시캡 거리
     */
    static distanceTaxicab(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) + Math.abs(a.w - b.w);
    }
    *[Symbol.iterator]() {
        yield* this.values;
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case "number":
                return this.length;
            case "string":
            default:
                return this.toString();
        }
    }
    /**
     * @returns 영벡터를 반환합니다.
     */
    static get zero() {
        return new Vec4(0, 0, 0, 0);
    }
    /**
     * @returns 모든 요소가 1인 벡터를 반환합니다.
     */
    static get one() {
        return new Vec4(1, 1, 1, 1);
    }
    /**
     * @returns 벡터의 길이의 제곱을 반환합니다.
     */
    get lengthSquared() {
        return this.values[0] * this.values[0] + this.values[1] * this.values[1] + this.values[2] * this.values[2] + this.values[3] * this.values[3];
    }
    /**
     * @alias magnitude
     * @returns 벡터의 크기를 반환합니다.
     */
    get length() {
        return Math.hypot(this.values[0], this.values[1], this.values[2], this.values[3]);
    }
    /**
     * @alias magnitude
     * @param value 벡터의 크기
     */
    set length(value) {
        const currentLength = this.length;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.values[0] *= scale;
        this.values[1] *= scale;
        this.values[2] *= scale;
        this.values[3] *= scale;
    }
    /**
     * @alias length
     * @returns 벡터의 크기를 반환합니다.
     */
    get magnitude() {
        return Math.hypot(this.values[0], this.values[1], this.values[2], this.values[3]);
    }
    /**
     * @alias length
     * @param value 벡터의 크기
     */
    set magnitude(value) {
        const currentLength = this.magnitude;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.values[0] *= scale;
        this.values[1] *= scale;
        this.values[2] *= scale;
        this.values[3] *= scale;
    }
    /**
     * @alias taxicabLength
     * @returns 벡터의 맨해튼 거리를 반환합니다.
     */
    get manhattanLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]) + Math.abs(this.values[2]) + Math.abs(this.values[3]);
    }
    /**
     * @alias manhattanLength
     * @returns 벡터의 택시캡 거리를 반환합니다.
     */
    get taxicabLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]) + Math.abs(this.values[2]) + Math.abs(this.values[3]);
    }
    /**
     * @returns 벡터를 복사한 새로운 Vec4 객체를 반환합니다.
     */
    get clone() {
        return new Vec4(this.values[0], this.values[1], this.values[2], this.values[3]);
    }
    /**
     * @returns 벡터를 정규화한 새로운 Vec4 객체를 반환합니다.
     */
    get normalized() {
        const length = this.length;
        if (length === 0)
            return Vec4.zero;
        return new Vec4(this.values[0] / length, this.values[1] / length, this.values[2] / length, this.values[3] / length);
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get x() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set x(value) {
        this.values[0] = value;
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get [0]() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set [0](value) {
        this.values[0] = value;
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
    */
    get y() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
    */
    set y(value) {
        this.values[1] = value;
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
    */
    get [1]() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
    */
    set [1](value) {
        this.values[1] = value;
    }
    /**
     * @returns 벡터의 z값을 반환합니다.
    */
    get z() {
        return this.values[2];
    }
    /**
     * @param value 벡터의 z값
    */
    set z(value) {
        this.values[2] = value;
    }
    /**
     * @returns 벡터의 z값을 반환합니다.
    */
    get [2]() {
        return this.values[2];
    }
    /**
     * @param value 벡터의 z값
    */
    set [2](value) {
        this.values[2] = value;
    }
    /**
     * @returns 벡터의 w값을 반환합니다.
    */
    get w() {
        return this.values[2];
    }
    /**
     * @param value 벡터의 w값
    */
    set w(value) {
        this.values[2] = value;
    }
    /**
     * @returns 벡터의 w값을 반환합니다.
    */
    get [3]() {
        return this.values[3];
    }
    /**
     * @param value 벡터의 w값
    */
    set [3](value) {
        this.values[3] = value;
    }
    /**
     * @param vec 더할 벡터
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    add(vec) {
        this.values[0] += vec.x;
        this.values[1] += vec.y;
        this.values[2] += vec.z ?? 0;
        this.values[3] += vec.w ?? 0;
        return this;
    }
    /**
     * @param scalar 더할 스칼라
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addScalar(scalar) {
        this.values[0] += scalar;
        this.values[1] += scalar;
        this.values[2] += scalar;
        this.values[3] += scalar;
        return this;
    }
    /**
     * @param arr 더할 배열
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addArray(arr) {
        this.values[0] += arr[0];
        this.values[1] += arr[1];
        this.values[2] += arr[2] ?? 0;
        this.values[3] += arr[3] ?? 0;
        return this;
    }
    /**
     * @param vec 뺄 벡터
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    sub(vec) {
        this.values[0] -= vec.x;
        this.values[1] -= vec.y;
        this.values[2] -= vec.z ?? 0;
        this.values[3] -= vec.w ?? 0;
        return this;
    }
    /**
     * @param scalar 뺄 스칼라
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subScalar(scalar) {
        this.values[0] -= scalar;
        this.values[1] -= scalar;
        this.values[2] -= scalar;
        this.values[3] -= scalar;
        return this;
    }
    /**
     * @param arr 뺄 배열
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subArray(arr) {
        this.values[0] -= arr[0];
        this.values[1] -= arr[1];
        this.values[2] -= arr[2] ?? 0;
        this.values[3] -= arr[3] ?? 0;
        return this;
    }
    /**
     * @param vec 곱할 벡터
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mul(vec) {
        this.values[0] *= vec.x;
        this.values[1] *= vec.y;
        this.values[2] *= vec.z ?? 1;
        this.values[3] *= vec.w ?? 1;
        return this;
    }
    /**
     * @param scalar 곱할 스칼라
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulScalar(scalar) {
        this.values[0] *= scalar;
        this.values[1] *= scalar;
        this.values[2] *= scalar;
        this.values[3] *= scalar;
        return this;
    }
    /**
     * @param arr 곱할 배열
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulArray(arr) {
        this.values[0] *= arr[0];
        this.values[1] *= arr[1];
        this.values[2] *= arr[2] ?? 1;
        this.values[3] *= arr[3] ?? 1;
        return this;
    }
    /**
     * @param vec 나눌 벡터
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    div(vec) {
        this.values[0] /= vec.x;
        this.values[1] /= vec.y;
        this.values[2] /= vec.z ?? 1;
        this.values[3] /= vec.w ?? 1;
        return this;
    }
    /**
     * @param scalar 나눌 스칼라
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    divScalar(scalar) {
        this.values[0] /= scalar;
        this.values[1] /= scalar;
        this.values[2] /= scalar;
        this.values[3] /= scalar;
        return this;
    }
    /**
     * @param arr 나눌 배열
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    divArray(arr) {
        this.values[0] /= arr[0];
        this.values[1] /= arr[1];
        this.values[2] /= arr[2] ?? 1;
        this.values[3] /= arr[3] ?? 1;
        return this;
    }
    /**
     * @param vec 나머지를 구할 벡터
     * @returns 원본 벡터에서 벡터와의 나머지를 구한 후 반환합니다.
     */
    mod(vec) {
        this.values[0] %= vec.x;
        this.values[1] %= vec.y;
        this.values[2] %= vec.z ?? 1;
        this.values[3] %= vec.w ?? 1;
        return this;
    }
    /**
     * @param scalar 나머지를 구할 스칼라
     * @returns 원본 벡터에서 스칼라와의 나머지를 구한 후 반환합니다.
     */
    modScalar(scalar) {
        this.values[0] %= scalar;
        this.values[1] %= scalar;
        this.values[2] %= scalar;
        this.values[3] %= scalar;
        return this;
    }
    /**
     * @param arr 나머지를 구할 배열
     * @returns 원본 벡터에서 배열과의 나머지를 구한 후 반환합니다.
     */
    modArray(arr) {
        this.values[0] %= arr[0];
        this.values[1] %= arr[1];
        this.values[2] %= arr[2] ?? 1;
        this.values[3] %= arr[3] ?? 1;
        return this;
    }
    /**
     * @param vec 내적할 벡터
     * @returns 두 벡터의 내적을 반환합니다.
     */
    dot(vec) {
        return this.values[0] * vec.x + this.values[1] * vec.y + this.values[2] * (vec.z ?? 0) + this.values[3] * (vec.w ?? 0);
    }
    /**
     * @param digits 반올림할 자릿수
     * @returns 원본 벡터를 반올림한 후 반환합니다.
     */
    round(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.round(this.values[0] * pow) / pow;
        this.values[1] = Math.round(this.values[1] * pow) / pow;
        this.values[2] = Math.round(this.values[2] * pow) / pow;
        this.values[3] = Math.round(this.values[3] * pow) / pow;
        return this;
    }
    /**
     * @param digits 내림할 자릿수
     * @returns 원본 벡터를 내림한 후 반환합니다.
     */
    floor(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.floor(this.values[0] * pow) / pow;
        this.values[1] = Math.floor(this.values[1] * pow) / pow;
        this.values[2] = Math.floor(this.values[2] * pow) / pow;
        this.values[3] = Math.floor(this.values[3] * pow) / pow;
        return this;
    }
    /**
     * @param digits 올림할 자릿수
     * @returns 원본 벡터를 올림한 후 반환합니다.
     */
    ceil(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.ceil(this.values[0] * pow) / pow;
        this.values[1] = Math.ceil(this.values[1] * pow) / pow;
        this.values[2] = Math.ceil(this.values[2] * pow) / pow;
        this.values[3] = Math.ceil(this.values[3] * pow) / pow;
        return this;
    }
    /**
     * @param digits 버릴 자릿수
     * @returns 원본 벡터를 버린 후 반환합니다.
     */
    trunc(digits = 0) {
        const pow = Math.pow(10, digits);
        this.values[0] = Math.trunc(this.values[0] * pow) / pow;
        this.values[1] = Math.trunc(this.values[1] * pow) / pow;
        this.values[2] = Math.trunc(this.values[2] * pow) / pow;
        this.values[3] = Math.trunc(this.values[3] * pow) / pow;
        return this;
    }
    /**
     * @returns 원본 벡터의 요소를 절댓값으로 변경한 후 반환합니다.
     */
    abs() {
        this.values[0] = Math.abs(this.values[0]);
        this.values[1] = Math.abs(this.values[1]);
        this.values[2] = Math.abs(this.values[2]);
        this.values[3] = Math.abs(this.values[3]);
        return this;
    }
    /**
     * @param func 적용할 함수
     * @returns 원본 벡터의 요소에 함수를 적용한 후 반환합니다.
     */
    do(func) {
        this.values[0] = func(this.values[0]);
        this.values[1] = func(this.values[1]);
        this.values[2] = func(this.values[2]);
        this.values[3] = func(this.values[3]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 min연산을 수행합니다.
     */
    min(vec) {
        this.values[0] = Math.min(this.values[0], vec.x);
        this.values[1] = Math.min(this.values[1], vec.y);
        this.values[2] = Math.min(this.values[2], vec.z);
        this.values[3] = Math.min(this.values[3], vec.w);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 min연산을 수행합니다.
     */
    minScalar(scalar) {
        this.values[0] = Math.min(this.values[0], scalar);
        this.values[1] = Math.min(this.values[1], scalar);
        this.values[2] = Math.min(this.values[2], scalar);
        this.values[3] = Math.min(this.values[3], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 min연산을 수행합니다.
     */
    minArr(arr) {
        this.values[0] = Math.min(this.values[0], arr[0]);
        this.values[1] = Math.min(this.values[1], arr[1]);
        this.values[2] = Math.min(this.values[2], arr[2]);
        this.values[3] = Math.min(this.values[3], arr[3]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 max연산을 수행합니다.
     */
    max(vec) {
        this.values[0] = Math.max(this.values[0], vec.x);
        this.values[1] = Math.max(this.values[1], vec.y);
        this.values[2] = Math.max(this.values[2], vec.z);
        this.values[3] = Math.max(this.values[3], vec.w);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 max연산을 수행합니다.
     */
    maxScalar(scalar) {
        this.values[0] = Math.max(this.values[0], scalar);
        this.values[1] = Math.max(this.values[1], scalar);
        this.values[2] = Math.max(this.values[2], scalar);
        this.values[3] = Math.max(this.values[3], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 max연산을 수행합니다.
     */
    maxArr(arr) {
        this.values[0] = Math.max(this.values[0], arr[0]);
        this.values[1] = Math.max(this.values[1], arr[1]);
        this.values[2] = Math.max(this.values[2], arr[2]);
        this.values[3] = Math.max(this.values[3], arr[3]);
        return this;
    }
    /**
     * @param min 최소 벡터
     * @param max 최대 벡터
     * @returns 원본 벡터의 요소를 최소 벡터와 최대 벡터 사이의 값으로 클램프한 후 반환합니다.
     */
    clamp(min, max) {
        this.values[0] = Math.max(min.x, Math.min(max.x, this.values[0]));
        this.values[1] = Math.max(min.y, Math.min(max.y, this.values[1]));
        this.values[2] = Math.max(min.z, Math.min(max.z, this.values[2]));
        this.values[3] = Math.max(min.w, Math.min(max.w, this.values[3]));
        return this;
    }
    /**
     * @param min 최소 스칼라
     * @param max 최대 스칼라
     * @returns 원본 벡터의 요소를 최소 스칼라와 최대 스칼라 사이의 값으로 클램프한 후 반환합니다.
     */
    clampScalar(min, max) {
        this.values[0] = Math.max(min, Math.min(max, this.values[0]));
        this.values[1] = Math.max(min, Math.min(max, this.values[1]));
        this.values[2] = Math.max(min, Math.min(max, this.values[2]));
        this.values[3] = Math.max(min, Math.min(max, this.values[3]));
        return this;
    }
    /**
     * @param min 최소 배열
     * @param max 최대 배열
     * @returns 원본 벡터의 요소를 최소 배열과 최대 배열 사이의 값으로 클램프한 후 반환합니다.
     */
    clampArr(min, max) {
        this.values[0] = Math.max(min[0], Math.min(max[0], this.values[0]));
        this.values[1] = Math.max(min[1], Math.min(max[1], this.values[1]));
        this.values[2] = Math.max(min[2], Math.min(max[2], this.values[2]));
        this.values[3] = Math.max(min[3], Math.min(max[3], this.values[3]));
        return this;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리의 제곱을 반환합니다.
     */
    distanceSquared(vec) {
        const dx = this.values[0] - vec.x;
        const dy = this.values[1] - vec.y;
        const dz = this.values[2] - vec.z;
        const dw = this.values[3] - vec.w;
        return dx * dx + dy * dy + dz * dz;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리를 반환합니다.
     */
    distance(vec) {
        return Math.hypot(this.values[0] - vec.x, this.values[1] - vec.y, this.values[2] - vec.z, this.values[3] - vec.w);
    }
    /**
     * @alias taxicabDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 맨해튼 거리를 반환합니다.
     */
    manhattanDistance(vec) {
        return Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y) + Math.abs(this.values[2] - vec.z) + Math.abs(this.values[3] - vec.w);
    }
    /**
     * @alias manhattanDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 택시캡 거리를 반환합니다.
     */
    taxicabDistance(vec) {
        return Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y) + Math.abs(this.values[2] - vec.z) + Math.abs(this.values[3] - vec.w);
    }
    /**
     * @returns 원본 벡터를 정규화한 후 반환합니다.
     */
    normalize() {
        const length = this.length;
        if (length === 0)
            return this;
        this.values[0] /= length;
        this.values[1] /= length;
        this.values[2] /= length;
        this.values[3] /= length;
        return this;
    }
    /**
     * @returns 원본 벡터의 요소를 반대로 변경한 후 반환합니다.
     */
    negate() {
        this.values[0] = -this.values[0];
        this.values[1] = -this.values[1];
        this.values[2] = -this.values[2];
        this.values[3] = -this.values[3];
        return this;
    }
    /**
     * @param vec 목표 벡터
     * @param t 진행도
     * @returns 원본 벡터를 목표 벡터로 선형 보간한 후 반환합니다.
     */
    lerp(vec, t) {
        this.values[0] += (vec.x - this.values[0]) * t;
        this.values[1] += (vec.y - this.values[1]) * t;
        this.values[2] += (vec.z - this.values[2]) * t;
        this.values[3] += (vec.w - this.values[3]) * t;
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 두 벡터가 같은지 비교합니다.
     */
    equals(vec) {
        return this.values[0] === vec.x && this.values[1] === vec.y && this.values[2] === vec.z && this.values[3] === vec.w;
    }
    /**
     * @returns 벡터를 문자열 형태로 반환합니다.
     */
    toString() {
        return `(${this.values[0]}, ${this.values[1]}, ${this.values[2]}, ${this.values[3]})`;
    }
    /**
     * @returns 벡터를 객체 형태로 반환합니다.
     */
    toObject() {
        return { x: this.values[0], y: this.values[1], z: this.values[2], w: this.values[3] };
    }
    /**
     * @returns 벡터를 배열 형태로 반환합니다.
     */
    toArray() {
        return [this.values[0], this.values[1], this.values[2], this.values[3]];
    }
    /**
     * @returns 벡터를 JSON 형태로 변환합니다.
     */
    toJSON() {
        return { x: this.values[0], y: this.values[1], z: this.values[2], w: this.values[3] };
    }
}

;// ./node_modules/vecs-ts/dist/int-vec2.js
class IntVec2 {
    constructor(x, y) {
        this.values = new Int32Array(2).fill(0);
        this.x = Math.floor(x);
        this.y = Math.floor(y);
    }
    static from(vec) {
        return new IntVec2(Math.floor(vec.x), Math.floor(vec.y));
    }
    static fromScalar(scalar) {
        const floor = Math.floor(scalar);
        return new IntVec2(floor, floor);
    }
    static fromArray(arr) {
        return new IntVec2(Math.floor(arr[0]), Math.floor(arr[1]));
    }
    static fromString(str) {
        const [x, y] = str.slice(1, -1).split(", ").map(parseFloat);
        return new IntVec2(Math.floor(x), Math.floor(y));
    }
    /**
     * 두 벡터를 더한 새로운 Vec2 객체를 반환합니다.
     * @param a 더할 벡터
     * @param b 더할 벡터
     * @returns 두 벡터를 더한 새로운 Vec2 객체
     */
    static add(a, b) {
        return new IntVec2(a.x + b.x, a.y + b.y);
    }
    /**
     * 두 벡터를 뺀 새로운 Vec2 객체를 반환합니다.
     * @param a 벡터
     * @param b 빼는 벡터
     * @returns 두 벡터를 뺀 새로운 Vec2 객체
     */
    static sub(a, b) {
        return new IntVec2(a.x - b.x, a.y - b.y);
    }
    /**
     * 두 벡터를 곱한 새로운 Vec2 객체를 반환합니다.
     * @param a 곱할 벡터
     * @param b 곱할 벡터
     * @returns 두 벡터를 곱한 새로운 Vec2 객체
     */
    static mul(a, b) {
        return new IntVec2(a.x * b.x, a.y * b.y);
    }
    /**
     * 두 벡터를 나눈 새로운 Vec2 객체를 반환합니다.
     * @param a 나눌 벡터
     * @param b 나누는 벡터
     * @returns 두 벡터를 나눈 새로운 Vec2 객체
     */
    static div(a, b) {
        return new IntVec2(a.x / b.x, a.y / b.y);
    }
    /**
     * 두 벡터를 나눈 나머지를 구한 새로운 Vec2 객체를 반환합니다.
     * @param a 나머지를 구할 벡터
     * @param b 나누는 벡터
     * @returns 두 벡터의 나머지를 구한 새로운 Vec2 객체
     */
    static mod(a, b) {
        return new IntVec2(a.x % b.x, a.y % b.y);
    }
    /**
     * 두 벡터의 내적을 반환합니다.
     * @param a 내적할 벡터
     * @param b 내적할 벡터
     * @returns 두 벡터의 내적
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    /**
     * 두 벡터의 외적을 반환합니다.
     * @param a 외적할 벡터
     * @param b 외적할 벡터
     * @returns 두 벡터의 외적
     */
    static cross(a, b) {
        return a.x * b.y - a.y * b.x;
    }
    /**
     * 두 벡터의 거리를 반환합니다.
     * @param a 거리 구할 벡터
     * @param b 거리 구할 벡터
     * @returns 두 벡터의 거리
     */
    static distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }
    /**
     * 두 벡터의 거리의 제곱을 반환합니다.
     * @param a 거리 구할 벡터
     * @param b 거리 구할 벡터
     * @returns 두 벡터의 거리의 제곱
     */
    static distanceSquared(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return dx * dx + dy * dy;
    }
    /**
     * 두 벡터의 맨해튼 거리를 반환합니다.
     * @param a 거리 구할 벡터
     * @param b 거리 구할 벡터
     * @returns 두 벡터의 맨해튼 거리
     */
    static manhattanDistance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    /**
     * 두 벡터의 택시캡 거리를 반환합니다.
     * @param a 거리 구할 벡터
     * @param b 거리 구할 벡터
     * @returns 두 벡터의 택시캡 거리
     */
    static taxicabDistance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    *[Symbol.iterator]() {
        yield* this.values;
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case "number":
                return this.length;
            case "string":
            default:
                return this.toString();
        }
    }
    /**
     * @returns 영벡터를 반환합니다.
     */
    static get zero() {
        return new IntVec2(0, 0);
    }
    /**
     * @returns 모든 요소가 1인 벡터를 반환합니다.
     */
    static get one() {
        return new IntVec2(1, 1);
    }
    /**
     * @returns x요소가 1인 벡터를 반환합니다.
     */
    static get right() {
        return new IntVec2(1, 0);
    }
    /**
     * @returns x요소가 -1인 벡터를 반환합니다.
     */
    static get left() {
        return new IntVec2(-1, 0);
    }
    /**
     * @returns y요소가 1인 벡터를 반환합니다.
     */
    static get up() {
        return new IntVec2(0, 1);
    }
    /**
     * @returns y요소가 -1인 벡터를 반환합니다.
     */
    static get down() {
        return new IntVec2(0, -1);
    }
    /**
     * @returns 벡터의 길이의 제곱을 반환합니다.
     */
    get lengthSquared() {
        return this.values[0] * this.values[0] + this.values[1] * this.values[1];
    }
    /**
     * @alias magnitude
     * @returns 벡터의 크기를 반환합니다.
     */
    get length() {
        return Math.hypot(this.values[0], this.values[1]);
    }
    /**
     * @alias magnitude
     * @param value 벡터의 크기
     * @example
     * const vec = new IntVec2(3, 4);
     * vec.length = 10;
     *
     * console.log(vec.toString()); // (6, 8)
     */
    set length(value) {
        const currentLength = this.length;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.x *= scale;
        this.y *= scale;
    }
    /**
     * @alias length
     * @returns 벡터의 크기를 반환합니다.
     */
    get magnitude() {
        return Math.hypot(this.values[0], this.values[1]);
    }
    /**
     * @alias length
     * @param value 벡터의 크기
     * @example
     * const vec = new IntVec2(3, 4);
     * vec.magnitude = 10;
     *
     * console.log(vec.toString()); // (6, 8)
     */
    set magnitude(value) {
        const currentLength = this.magnitude;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.x *= scale;
        this.y *= scale;
    }
    /**
     * @alias taxicabLength
     * @returns 벡터의 맨해튼 거리를 반환합니다.
     */
    get manhattanLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]);
    }
    /**
     * @alias manhattanLength
     * @returns 벡터의 택시캡 거리를 반환합니다.
     */
    get taxicabLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]);
    }
    /**
     * @returns 벡터를 복사한 새로운 Vec2 객체를 반환합니다.
     */
    get clone() {
        return new IntVec2(this.values[0], this.values[1]);
    }
    /**
     * @returns 벡터를 정규화한 새로운 Vec2 객체를 반환합니다.
     */
    get normalized() {
        const length = this.length;
        if (length === 0)
            return IntVec2.zero;
        return new IntVec2(this.values[0] / length, this.values[1] / length);
    }
    /**
     * @returns 벡터를 수직으로 회전한 새로운 Vec2 객체를 반환합니다.
     */
    get perpendicular() {
        return new IntVec2(-this.values[1], this.values[0]);
    }
    /**
     * @returns 벡터의 각도를 반환합니다.
     */
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get x() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set x(value) {
        this.values[0] = Math.floor(value);
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get [0]() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set [0](value) {
        this.values[0] = Math.floor(value);
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
    */
    get y() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
    */
    set y(value) {
        this.values[1] = Math.floor(value);
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
    */
    get [1]() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
    */
    set [1](value) {
        this.values[1] = Math.floor(value);
    }
    /**
     * @param vec 더할 벡터
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }
    /**
     * @param scalar 더할 스칼라
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addScalar(scalar) {
        this.x += scalar;
        this.y += scalar;
        return this;
    }
    /**
     * @param arr 더할 배열
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addArray(arr) {
        this.x += arr[0];
        this.y += arr[1];
        return this;
    }
    /**
     * @param vec 뺄 벡터
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }
    /**
     * @param scalar 뺄 스칼라
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subScalar(scalar) {
        this.x -= scalar;
        this.y -= scalar;
        return this;
    }
    /**
     * @param arr 뺄 배열
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subArray(arr) {
        this.x -= arr[0];
        this.y -= arr[1];
        return this;
    }
    /**
     * @param vec 곱할 벡터
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mul(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
        return this;
    }
    /**
     * @param scalar 곱할 스칼라
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    /**
     * @param arr 곱할 배열
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulArray(arr) {
        this.x *= arr[0];
        this.y *= arr[1];
        return this;
    }
    /**
     * @param vec 나눌 벡터
     * @returns 원본 벡터에서 값을 나눈 후 반환합니다.
     */
    div(vec) {
        this.x /= vec.x;
        this.y /= vec.y;
        return this;
    }
    /**
     * @param scalar 나눌 스칼라
     * @returns 원본 벡터에서 값을 나눈 후 반환합니다.
     */
    divScalar(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    /**
     * @param arr 나눌 배열
     * @returns 원본 벡터에서 값을 나눈 후 반환합니다.
     */
    divArray(arr) {
        this.x /= arr[0];
        this.y /= arr[1];
        return this;
    }
    /**
     * @param vec 나머지를 구할 벡터
     * @returns 원본 벡터에서 벡터와의 나머지를 구한 후 반환합니다.
     */
    mod(vec) {
        this.x %= vec.x;
        this.y %= vec.y;
        return this;
    }
    /**
     * @param scalar 나머지를 구할 스칼라
     * @returns 원본 벡터에서 스칼라와의 나머지를 구한 후 반환합니다.
     */
    modScalar(scalar) {
        this.x %= scalar;
        this.y %= scalar;
        return this;
    }
    /**
     * @param arr 나머지를 구할 배열
     * @returns 원본 벡터에서 배열과의 나머지를 구한 후 반환합니다.
     */
    modArray(arr) {
        this.x %= arr[0];
        this.y %= arr[1];
        return this;
    }
    /**
     * @param vec 내적할 벡터
     * @returns 두 벡터의 내적을 반환합니다.
     */
    dot(vec) {
        return this.values[0] * vec.x + this.values[1] * vec.y;
    }
    /**
     * @param vec 외적할 벡터
     * @returns 두 벡터의 외적을 반환합니다.
     */
    cross(vec) {
        return this.values[0] * vec.y - this.values[1] * vec.x;
    }
    /**
     * @param radians 회전할 각도
     * @returns 원본 벡터를 회전한 후 반환합니다.
     */
    rotate(radians) {
        const x = this.values[0];
        const y = this.values[1];
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        return this;
    }
    /**
     * @param center 중심점
     * @param radians 회전할 각도
     * @returns 원본 벡터를 중심점을 기준으로 회전한 후 반환합니다.
     */
    rotateAround(center, radians) {
        const x = this.values[0] - center.x;
        const y = this.values[1] - center.y;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.x = x * cos - y * sin + center.x;
        this.y = x * sin + y * cos + center.y;
        return this;
    }
    /**
     * @returns 원본 벡터의 요소를 절댓값으로 변경한 후 반환합니다.
     */
    abs() {
        this.x = Math.abs(this.values[0]);
        this.y = Math.abs(this.values[1]);
        return this;
    }
    /**
     * @param func 적용할 함수
     * @returns 원본 벡터의 요소에 함수를 적용한 후 반환합니다.
     */
    do(func) {
        this.x = func(this.values[0]);
        this.y = func(this.values[1]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 min연산을 수행합니다.
     */
    min(vec) {
        this.x = Math.min(this.values[0], vec.x);
        this.y = Math.min(this.values[1], vec.y);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 min연산을 수행합니다.
     */
    minScalar(scalar) {
        this.x = Math.min(this.values[0], scalar);
        this.y = Math.min(this.values[1], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 min연산을 수행합니다.
     */
    minArr(arr) {
        this.x = Math.min(this.values[0], arr[0]);
        this.y = Math.min(this.values[1], arr[1]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 max연산을 수행합니다.
     */
    max(vec) {
        this.x = Math.max(this.values[0], vec.x);
        this.y = Math.max(this.values[1], vec.y);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 max연산을 수행합니다.
     */
    maxScalar(scalar) {
        this.x = Math.max(this.values[0], scalar);
        this.y = Math.max(this.values[1], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 max연산을 수행합니다.
     */
    maxArr(arr) {
        this.x = Math.max(this.values[0], arr[0]);
        this.y = Math.max(this.values[1], arr[1]);
        return this;
    }
    /**
     * @param min 최소 벡터
     * @param max 최대 벡터
     * @returns 원본 벡터의 요소를 최소 벡터와 최대 벡터 사이의 값으로 클램프한 후 반환합니다.
     */
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.values[0]));
        this.y = Math.max(min.y, Math.min(max.y, this.values[1]));
        return this;
    }
    /**
     * @param min 최소 스칼라
     * @param max 최대 스칼라
     * @returns 원본 벡터의 요소를 최소 스칼라와 최대 스칼라 사이의 값으로 클램프한 후 반환합니다.
     */
    clampScalar(min, max) {
        this.x = Math.max(min, Math.min(max, this.values[0]));
        this.y = Math.max(min, Math.min(max, this.values[1]));
        return this;
    }
    /**
     * @param min 최소 배열
     * @param max 최대 배열
     * @returns 원본 벡터의 요소를 최소 배열과 최대 배열 사이의 값으로 클램프한 후 반환합니다.
     */
    clampArr(min, max) {
        this.x = Math.max(min[0], Math.min(max[0], this.values[0]));
        this.y = Math.max(min[1], Math.min(max[1], this.values[1]));
        return this;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리의 제곱을 반환합니다.
     */
    distanceSquared(vec) {
        const dx = this.values[0] - vec.x;
        const dy = this.values[1] - vec.y;
        return dx * dx + dy * dy;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리를 반환합니다.
     */
    distance(vec) {
        return Math.hypot(this.values[0] - vec.x, this.values[1] - vec.y);
    }
    /**
     * @alias taxicabDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 맨해튼 거리를 반환합니다.
     */
    manhattanDistance(vec) {
        return Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y);
    }
    /**
     * @alias manhattanDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 택시캡 거리를 반환합니다.
     */
    taxicabDistance(vec) {
        return Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y);
    }
    /**
     * @returns 원본 벡터를 정규화한 후 반환합니다.
     */
    normalize() {
        const length = this.length;
        if (length === 0)
            return this;
        this.x /= length;
        this.y /= length;
        return this;
    }
    /**
     * @returns 원본 벡터의 요소를 반대로 변경한 후 반환합니다.
     */
    negate() {
        this.x = -this.values[0];
        this.y = -this.values[1];
        return this;
    }
    /**
     * @param vec 목표 벡터
     * @param t 진행도
     * @returns 원본 벡터를 목표 벡터로 선형 보간한 후 반환합니다.
     */
    lerp(vec, t) {
        this.x += (vec.x - this.values[0]) * t;
        this.y += (vec.y - this.values[1]) * t;
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 두 벡터가 같은지 비교합니다.
     */
    equals(vec) {
        return this.x === vec.x && this.y === vec.y;
    }
    /**
     * @returns 벡터를 문자열 형태로 반환합니다.
     */
    toString() {
        return `(${this.values[0]}, ${this.values[1]})`;
    }
    /**
     * @returns 벡터를 객체 형태로 반환합니다.
     */
    toObject() {
        return { x: this.values[0], y: this.values[1] };
    }
    /**
     * @returns 벡터를 배열 형태로 반환합니다.
     */
    toArray() {
        return [this.values[0], this.values[1]];
    }
    /**
     * @returns 벡터를 JSON 형태로 변환합니다.
     */
    toJSON() {
        return { x: this.values[0], y: this.values[1] };
    }
}

;// ./node_modules/vecs-ts/dist/int-vec3.js


class IntVec3 {
    constructor(x, y, z) {
        this.values = new Int32Array(3).fill(0);
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.z = Math.floor(z);
    }
    static from(vec) {
        return new IntVec3(Math.floor(vec.x), Math.floor(vec.y), Math.floor(vec.z ?? 0));
    }
    static fromScalar(scalar) {
        const floor = Math.floor(scalar);
        return new IntVec3(floor, floor, floor);
    }
    static fromArray(arr) {
        return new IntVec3(Math.floor(arr[0]), Math.floor(arr[1]), Math.floor(arr[2] ?? 0));
    }
    static fromString(str) {
        const [x, y, z] = str.slice(1, -1).split(", ").map(parseFloat);
        return new IntVec3(Math.floor(x), Math.floor(y), Math.floor(z));
    }
    /**
     * 두 벡터를 더한 새로운 Vec3 객체를 반환합니다.
     * @param a 더할 벡터
     * @param b 더할 벡터
     * @returns 두 벡터를 더한 새로운 Vec3 객체
     */
    static add(a, b) {
        return new IntVec3(a.x + b.x, a.y + b.y, a.z + b.z);
    }
    /**
     * 두 벡터를 뺀 새로운 Vec3 객체를 반환합니다.
     * @param a 벡터
     * @param b 빼는 벡터
     * @returns 두 벡터를 뺀 새로운 Vec3 객체
     */
    static sub(a, b) {
        return new IntVec3(a.x - b.x, a.y - b.y, a.z - b.z);
    }
    /**
     * 두 벡터를 곱한 새로운 Vec3 객체를 반환합니다.
     * @param a 곱할 벡터
     * @param b 곱할 벡터
     * @returns 두 벡터를 곱한 새로운 Vec3 객체
     */
    static mul(a, b) {
        return new IntVec3(a.x * b.x, a.y * b.y, a.z * b.z);
    }
    /**
     * 두 벡터를 나눈 새로운 Vec3 객체를 반환합니다.
     * @param a 나눌 벡터
     * @param b 나눌 벡터
     * @returns 두 벡터를 나눈 새로운 Vec3 객체
     */
    static div(a, b) {
        return new IntVec3(a.x / b.x, a.y / b.y, a.z / b.z);
    }
    /**
     * 두 벡터의 나머지를 구한 새로운 Vec3 객체를 반환합니다.
     * @param a 나머지를 구할 벡터
     * @param b 나머지를 구할 벡터
     * @returns 두 벡터의 나머지를 구한 새로운 Vec3 객체
     */
    static mod(a, b) {
        return new IntVec3(a.x % b.x, a.y % b.y, a.z % b.z);
    }
    /**
     * 두 벡터의 내적을 반환합니다.
     * @param a 내적할 벡터
     * @param b 내적할 벡터
     * @returns 두 벡터의 내적
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    /**
     * 두 벡터의 외적을 구한 새로운 Vec3 객체를 반환합니다.
     * @param a 외적할 벡터
     * @param b 외적할 벡터
     * @returns 두 벡터의 외적을 구한 새로운 Vec3 객체
     */
    static cross(a, b) {
        return new IntVec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }
    /**
     * 두 벡터 사이의 거리를 반환합니다.
     * @param a 거리 구할 벡터
     * @param b 거리 구할 벡터
     * @returns 두 벡터 사이의 거리
     */
    static distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    }
    /**
     * 두 벡터 사이의 거리 제곱을 반환합니다.
     * @param a 거리 제곱 구할 벡터
     * @param b 거리 제곱 구할 벡터
     * @returns 두 벡터 사이의 거리 제곱
     */
    static distanceSquared(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return dx * dx + dy * dy + dz * dz;
    }
    /**
     * 두 벡터 사이의 맨해튼 거리를 반환합니다.
     * @param a 맨해튼 거리 구할 벡터
     * @param b 맨해튼 거리 구할 벡터
     * @returns 두 벡터 사이의 맨해튼 거리
     */
    static distanceManhattan(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
    }
    /**
     * 두 벡터 사이의 택시캡 거리를 반환합니다.
     * @param a 택시캡 거리 구할 벡터
     * @param b 택시캡 거리 구할 벡터
     * @returns 두 벡터 사이의 택시캡 거리
     */
    static distanceTaxicab(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
    }
    *[Symbol.iterator]() {
        yield* this.values;
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case "number":
                return this.length;
            case "string":
            default:
                return this.toString();
        }
    }
    /**
     * @returns 영벡터를 반환합니다.
     */
    static get zero() {
        return new IntVec3(0, 0, 0);
    }
    /**
     * @returns 모든 요소가 1인 벡터를 반환합니다.
     */
    static get one() {
        return new IntVec3(1, 1, 1);
    }
    /**
     * @returns x요소가 1인 벡터를 반환합니다.
     */
    static get east() {
        return new IntVec3(1, 0, 0);
    }
    /**
     * @returns x요소가 -1인 벡터를 반환합니다.
     */
    static get west() {
        return new IntVec3(-1, 0, 0);
    }
    /**
     * @returns y요소가 1인 벡터를 반환합니다.
     */
    static get above() {
        return new IntVec3(0, 1, 0);
    }
    /**
     * @returns y요소가 -1인 벡터를 반환합니다.
     */
    static get below() {
        return new IntVec3(0, -1, 0);
    }
    /**
     * @returns z요소가 1인 벡터를 반환합니다.
     */
    static get north() {
        return new IntVec3(0, 0, 1);
    }
    /**
     * @returns z요소가 -1인 벡터를 반환합니다.
     */
    static get south() {
        return new IntVec3(0, 0, -1);
    }
    /**
     * @returns 벡터의 길이의 제곱을 반환합니다.
     */
    get lengthSquared() {
        return this.values[0] * this.values[0] + this.values[1] * this.values[1] + this.values[2] * this.values[2];
    }
    /**
     * @alias magnitude
     * @returns 벡터의 크기를 반환합니다.
     */
    get length() {
        return Math.hypot(this.values[0], this.values[1], this.values[2]);
    }
    /**
     * @alias magnitude
     * @param value 벡터의 크기
     */
    set length(value) {
        const currentLength = this.length;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
    }
    /**
     * @alias length
     * @returns 벡터의 크기를 반환합니다.
     */
    get magnitude() {
        return Math.hypot(this.values[0], this.values[1], this.values[2]);
    }
    /**
     * @alias length
     * @param value 벡터의 크기
     */
    set magnitude(value) {
        const currentLength = this.magnitude;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
    }
    /**
     * @alias taxicabLength
     * @returns 벡터의 맨해튼 거리를 반환합니다.
     */
    get manhattanLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]) + Math.abs(this.values[2]);
    }
    /**
     * @alias manhattanLength
     * @returns 벡터의 택시캡 거리를 반환합니다.
     */
    get taxicabLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]) + Math.abs(this.values[2]);
    }
    /**
     * @returns 벡터를 복사한 새로운 Vec3 객체를 반환합니다.
     */
    get clone() {
        return new IntVec3(this.values[0], this.values[1], this.values[2]);
    }
    /**
     * @returns 벡터를 정규화한 새로운 Vec3 객체를 반환합니다.
     */
    get normalized() {
        const length = this.length;
        if (length === 0)
            return IntVec3.zero;
        return new IntVec3(this.values[0] / length, this.values[1] / length, this.values[2] / length);
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get x() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set x(value) {
        this.values[0] = Math.floor(value);
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get [0]() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set [0](value) {
        this.values[0] = Math.floor(value);
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
    */
    get y() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
    */
    set y(value) {
        this.values[1] = Math.floor(value);
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
    */
    get [1]() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
    */
    set [1](value) {
        this.values[1] = Math.floor(value);
    }
    /**
     * @returns 벡터의 z값을 반환합니다.
    */
    get z() {
        return this.values[2];
    }
    /**
     * @param value 벡터의 z값
    */
    set z(value) {
        this.values[2] = Math.floor(value);
    }
    /**
     * @returns 벡터의 z값을 반환합니다.
    */
    get [2]() {
        return this.values[2];
    }
    /**
     * @param value 벡터의 z값
    */
    set [2](value) {
        this.values[2] = Math.floor(value);
    }
    /**
     * @param vec 더할 벡터
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z ?? 0;
        return this;
    }
    /**
     * @param scalar 더할 스칼라
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addScalar(scalar) {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        return this;
    }
    /**
     * @param arr 더할 배열
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addArray(arr) {
        this.x += arr[0];
        this.y += arr[1];
        this.z += arr[2] ?? 0;
        return this;
    }
    /**
     * @param vec 뺄 벡터
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z ?? 0;
        return this;
    }
    /**
     * @param scalar 뺄 스칼라
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subScalar(scalar) {
        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;
        return this;
    }
    /**
     * @param arr 뺄 배열
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subArray(arr) {
        this.x -= arr[0];
        this.y -= arr[1];
        this.z -= arr[2] ?? 0;
        return this;
    }
    /**
     * @param vec 곱할 벡터
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mul(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z ?? 1;
        return this;
    }
    /**
     * @param scalar 곱할 스칼라
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
    /**
     * @param arr 곱할 배열
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulArray(arr) {
        this.x *= arr[0];
        this.y *= arr[1];
        this.z *= arr[2] ?? 1;
        return this;
    }
    /**
     * @param vec 나눌 벡터
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    div(vec) {
        this.x /= vec.x;
        this.y /= vec.y;
        this.z /= vec.z ?? 1;
        return this;
    }
    /**
     * @param scalar 나눌 스칼라
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    divScalar(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
        return this;
    }
    /**
     * @param arr 나눌 배열
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    divArray(arr) {
        this.x /= arr[0];
        this.y /= arr[1];
        this.z /= arr[2] ?? 1;
        return this;
    }
    /**
     * @param vec 나머지를 구할 벡터
     * @returns 원본 벡터에서 벡터와의 나머지를 구한 후 반환합니다.
     */
    mod(vec) {
        this.x %= vec.x;
        this.y %= vec.y;
        this.z %= vec.z ?? 1;
        return this;
    }
    /**
     * @param scalar 나머지를 구할 스칼라
     * @returns 원본 벡터에서 스칼라와의 나머지를 구한 후 반환합니다.
     */
    modScalar(scalar) {
        this.x %= scalar;
        this.y %= scalar;
        this.z %= scalar;
        return this;
    }
    /**
     * @param arr 나머지를 구할 배열
     * @returns 원본 벡터에서 배열과의 나머지를 구한 후 반환합니다.
     */
    modArray(arr) {
        this.x %= arr[0];
        this.y %= arr[1];
        this.z %= arr[2] ?? 1;
        return this;
    }
    /**
     * @param vec 내적할 벡터
     * @returns 두 벡터의 내적을 반환합니다.
     */
    dot(vec) {
        return this.values[0] * vec.x + this.values[1] * vec.y + this.values[2] * (vec.z ?? 0);
    }
    /**
     * @param vec 외적할 벡터
     * @returns 두 벡터의 외적을 반환합니다.
     */
    cross(vec) {
        const { x, y, z } = this;
        const vx = vec.x;
        const vy = vec.y;
        const vz = vec.z ?? 0;
        this.x = y * vz - z * vy;
        this.y = z * vx - x * vz;
        this.z = x * vy - y * vx;
        return this;
    }
    /**
     * @param u 회전 축
     * @param radians 회전 각도
     * @returns 원본 벡터를 주어진 축으로 주어진 각도만큼 회전한 후 반환합니다.
     */
    rotationFromQuaternion(u, radians) {
        const v = new Quat(this.values[0], this.values[1], this.values[2], 0);
        const radianHalf = radians / 2;
        const sin = Math.sin(radianHalf);
        const cos = Math.cos(radianHalf);
        const q = new Quat(u.x * sin, u.y * sin, u.z * sin, cos).normalized;
        const qConjugate = q.conjugate;
        const rotated = q.mul(v).mul(qConjugate);
        this.x = rotated.x;
        this.y = rotated.y;
        this.z = rotated.z;
        return this;
    }
    /**
     * @param euler 각 축의 회전 각도
     * @param priority 회전 우선순위
     * @returns 원본 벡터를 주어진 각도만큼 회전한 후 반환합니다.
     */
    rotationFromEuler(euler, priority) {
        const { x, y, z } = euler;
        const cx = Math.cos(x / 2);
        const cy = Math.cos(y / 2);
        const cz = Math.cos(z / 2);
        const sx = Math.sin(x / 2);
        const sy = Math.sin(y / 2);
        const sz = Math.sin(z / 2);
        const qx = new Quat(sx, 0, 0, cx);
        const qy = new Quat(0, sy, 0, cy);
        const qz = new Quat(0, 0, sz, cz);
        let q;
        switch (priority) {
            case RotationPriority.XYZ:
                q = qz.mul(qy).mul(qx);
                break;
            case RotationPriority.XZY:
                q = qy.mul(qz).mul(qx);
                break;
            case RotationPriority.YXZ:
                q = qz.mul(qx).mul(qy);
                break;
            case RotationPriority.YZX:
                q = qx.mul(qz).mul(qy);
                break;
            case RotationPriority.ZXY:
                q = qy.mul(qx).mul(qz);
                break;
            case RotationPriority.ZYX:
                q = qx.mul(qy).mul(qz);
                break;
            default:
                throw new Error("Invalid rotation priority");
        }
        const v = new Quat(this.values[0], this.values[1], this.values[2], 0);
        const qConjugate = q.conjugate;
        const rotated = q.mul(v).mul(qConjugate);
        this.x = rotated.x;
        this.y = rotated.y;
        this.z = rotated.z;
        return this;
    }
    /**
     * @param radians x축 회전 각도
     * @returns 원본 벡터를 x축으로 주어진 각도만큼 회전한 후 반환합니다.
     */
    rotateX(radians) {
        const { y, z } = this;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.y = y * cos - z * sin;
        this.z = y * sin + z * cos;
        return this;
    }
    /**
     * @param radians y축 회전 각도
     * @returns 원본 벡터를 y축으로 주어진 각도만큼 회전한 후 반환합니다.
     */
    rotateY(radians) {
        const { x, z } = this;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.x = x * cos - z * sin;
        this.z = x * sin + z * cos;
        return this;
    }
    /**
     * @param radians z축 회전 각도
     * @returns 원본 벡터를 z축으로 주어진 각도만큼 회전한 후 반환합니다.
     */
    rotateZ(radians) {
        const { x, y } = this;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        return this;
    }
    /**
     * @returns 원본 벡터의 요소를 절댓값으로 변경한 후 반환합니다.
     */
    abs() {
        this.x = Math.abs(this.values[0]);
        this.y = Math.abs(this.values[1]);
        this.z = Math.abs(this.values[2]);
        return this;
    }
    /**
     * @param func 적용할 함수
     * @returns 원본 벡터의 요소에 함수를 적용한 후 반환합니다.
     */
    do(func) {
        this.x = func(this.values[0]);
        this.y = func(this.values[1]);
        this.z = func(this.values[2]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 min연산을 수행합니다.
     */
    min(vec) {
        this.x = Math.min(this.values[0], vec.x);
        this.y = Math.min(this.values[1], vec.y);
        this.z = Math.min(this.values[2], vec.z);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 min연산을 수행합니다.
     */
    minScalar(scalar) {
        this.x = Math.min(this.values[0], scalar);
        this.y = Math.min(this.values[1], scalar);
        this.z = Math.min(this.values[2], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 min연산을 수행합니다.
     */
    minArr(arr) {
        this.x = Math.min(this.values[0], arr[0]);
        this.y = Math.min(this.values[1], arr[1]);
        this.z = Math.min(this.values[2], arr[2]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 max연산을 수행합니다.
     */
    max(vec) {
        this.x = Math.max(this.values[0], vec.x);
        this.y = Math.max(this.values[1], vec.y);
        this.z = Math.max(this.values[2], vec.z);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 max연산을 수행합니다.
     */
    maxScalar(scalar) {
        this.x = Math.max(this.values[0], scalar);
        this.y = Math.max(this.values[1], scalar);
        this.z = Math.max(this.values[2], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 max연산을 수행합니다.
     */
    maxArr(arr) {
        this.x = Math.max(this.values[0], arr[0]);
        this.y = Math.max(this.values[1], arr[1]);
        this.z = Math.max(this.values[2], arr[2]);
        return this;
    }
    /**
     * @param min 최소 벡터
     * @param max 최대 벡터
     * @returns 원본 벡터의 요소를 최소 벡터와 최대 벡터 사이의 값으로 클램프한 후 반환합니다.
     */
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.values[0]));
        this.y = Math.max(min.y, Math.min(max.y, this.values[1]));
        this.z = Math.max(min.z, Math.min(max.z, this.values[2]));
        return this;
    }
    /**
     * @param min 최소 스칼라
     * @param max 최대 스칼라
     * @returns 원본 벡터의 요소를 최소 스칼라와 최대 스칼라 사이의 값으로 클램프한 후 반환합니다.
     */
    clampScalar(min, max) {
        this.x = Math.max(min, Math.min(max, this.values[0]));
        this.y = Math.max(min, Math.min(max, this.values[1]));
        this.z = Math.max(min, Math.min(max, this.values[2]));
        return this;
    }
    /**
     * @param min 최소 배열
     * @param max 최대 배열
     * @returns 원본 벡터의 요소를 최소 배열과 최대 배열 사이의 값으로 클램프한 후 반환합니다.
     */
    clampArr(min, max) {
        this.x = Math.max(min[0], Math.min(max[0], this.values[0]));
        this.y = Math.max(min[1], Math.min(max[1], this.values[1]));
        this.z = Math.max(min[2], Math.min(max[2], this.values[2]));
        return this;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리의 제곱을 반환합니다.
     */
    distanceSquared(vec) {
        const dx = this.values[0] - vec.x;
        const dy = this.values[1] - vec.y;
        const dz = this.values[2] - vec.z;
        return dx * dx + dy * dy + dz * dz;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리를 반환합니다.
     */
    distance(vec) {
        return Math.hypot(this.values[0] - vec.x, this.values[1] - vec.y, this.values[2] - vec.z);
    }
    /**
     * @alias taxicabDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 맨해튼 거리를 반환합니다.
     */
    manhattanDistance(vec) {
        return Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y) + Math.abs(this.values[2] - vec.z);
    }
    /**
     * @alias manhattanDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 택시캡 거리를 반환합니다.
     */
    taxicabDistance(vec) {
        return Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y) + Math.abs(this.values[2] - vec.z);
    }
    /**
     * @returns 원본 벡터를 정규화한 후 반환합니다.
     */
    normalize() {
        const length = this.length;
        if (length === 0)
            return this;
        this.x /= length;
        this.y /= length;
        this.z /= length;
        return this;
    }
    /**
     * @returns 원본 벡터의 요소를 반대로 변경한 후 반환합니다.
     */
    negate() {
        this.x = -this.values[0];
        this.y = -this.values[1];
        this.z = -this.values[2];
        return this;
    }
    /**
     * @param vec 목표 벡터
     * @param t 진행도
     * @returns 원본 벡터를 목표 벡터로 선형 보간한 후 반환합니다.
     */
    lerp(vec, t) {
        this.x += (vec.x - this.values[0]) * t;
        this.y += (vec.y - this.values[1]) * t;
        this.z += (vec.z - this.values[2]) * t;
        return this;
    }
    /**
     * @param vec 목표 벡터
     * @param t 진행도
     * @returns 원본 벡터를 목표 벡터로 구형 보간한 후 반환합니다.
     */
    slerp(v, t) {
        const vector = new IntVec3(v.x, v.y, v.z);
        const dot = this.normalized.dot(vector.normalized);
        const theta = Math.acos(dot) * t;
        const surface = this.clone.cross(v).normalized;
        const rotated = this.rotationFromQuaternion(surface, theta);
        this.x = rotated.x;
        this.y = rotated.y;
        this.z = rotated.z;
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 두 벡터가 같은지 비교합니다.
     */
    equals(vec) {
        return this.x === vec.x && this.y === vec.y && this.z === vec.z;
    }
    /**
     * @returns 벡터를 문자열 형태로 반환합니다.
     */
    toString() {
        return `(${this.values[0]}, ${this.values[1]}, ${this.values[2]})`;
    }
    /**
     * @returns 벡터를 객체 형태로 반환합니다.
     */
    toObject() {
        return { x: this.values[0], y: this.values[1], z: this.values[2] };
    }
    /**
     * @returns 벡터를 배열 형태로 반환합니다.
     */
    toArray() {
        return [this.values[0], this.values[1], this.values[2]];
    }
    /**
     * @returns 벡터를 JSON 형태로 변환합니다.
     */
    toJSON() {
        return { x: this.values[0], y: this.values[1], z: this.values[2] };
    }
}

;// ./node_modules/vecs-ts/dist/int-vec4.js
class IntVec4 {
    constructor(x, y, z, w) {
        this.values = new Int32Array(4).fill(0);
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.z = Math.floor(z);
        this.w = Math.floor(w);
    }
    static from(vec) {
        return new IntVec4(Math.floor(vec.x), Math.floor(vec.y), Math.floor(vec.z ?? 0), Math.floor(vec.w ?? 0));
    }
    static fromScalar(scalar) {
        const floor = Math.floor(scalar);
        return new IntVec4(floor, floor, floor, floor);
    }
    static fromArray(arr) {
        return new IntVec4(arr[0], arr[1], arr[2] ?? 0, arr[3] ?? 0);
    }
    static fromString(str) {
        const [x, y, z, w] = str.slice(1, -1).split(", ").map(parseFloat);
        return new IntVec4(Math.floor(x), Math.floor(y), Math.floor(z), Math.floor(w));
    }
    /**
     * 두 벡터를 더한 새로운 Vec4 객체를 반환합니다.
     * @param a 더할 벡터
     * @param b 더할 벡터
     * @returns 두 벡터를 더한 새로운 Vec4 객체
     */
    static add(a, b) {
        return new IntVec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    }
    /**
     * 두 벡터를 뺀 새로운 Vec4 객체를 반환합니다.
     * @param a 벡터
     * @param b 빼는 벡터
     * @returns 두 벡터를 뺀 새로운 Vec4 객체
     */
    static sub(a, b) {
        return new IntVec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }
    /**
     * 두 벡터를 곱한 새로운 Vec4 객체를 반환합니다.
     * @param a 곱할 벡터
     * @param b 곱할 벡터
     * @returns 두 벡터를 곱한 새로운 Vec4 객체
     */
    static mul(a, b) {
        return new IntVec4(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
    }
    /**
     * 두 벡터를 나눈 새로운 Vec4 객체를 반환합니다.
     * @param a 나눌 벡터
     * @param b 나눌 벡터
     * @returns 두 벡터를 나눈 새로운 Vec4 객체
     */
    static div(a, b) {
        return new IntVec4(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
    }
    /**
     * 두 벡터의 나머지를 구한 새로운 Vec4 객체를 반환합니다.
     * @param a 나머지를 구할 벡터
     * @param b 나머지를 구할 벡터
     * @returns 두 벡터의 나머지를 구한 새로운 Vec4 객체
     */
    static mod(a, b) {
        return new IntVec4(a.x % b.x, a.y % b.y, a.z % b.z, a.w % b.w);
    }
    /**
     * 두 벡터의 내적을 구한 새로운 Vec4 객체를 반환합니다.
     * @param a 내적할 벡터
     * @param b 내적할 벡터
     * @returns 두 벡터의 내적을 구한 새로운 Vec4 객체
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }
    /**
     * 두 벡터의 거리를 반환합니다.
     * @param a 거리를 구할 벡터
     * @param b 거리를 구할 벡터
     * @returns 두 벡터의 거리
     */
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const dw = a.w - b.w;
        return Math.hypot(dx, dy, dz, dw);
    }
    /**
     * 두 벡터의 거리의 제곱을 반환합니다.
     * @param a 거리의 제곱을 구할 벡터
     * @param b 거리의 제곱을 구할 벡터
     * @returns 두 벡터의 거리의 제곱
     */
    static distanceSquared(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const dw = a.w - b.w;
        return dx * dx + dy * dy + dz * dz + dw * dw;
    }
    /**
     * 두 벡터의 맨해튼 거리를 반환합니다.
     * @param a 맨해튼 거리를 구할 벡터
     * @param b 맨해튼 거리를 구할 벡터
     * @returns 두 벡터의 맨해튼 거리
     */
    static distanceManhattan(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) + Math.abs(a.w - b.w);
    }
    /**
     * 두 벡터의 택시캡 거리를 반환합니다.
     * @param a 택시캡 거리를 구할 벡터
     * @param b 택시캡 거리를 구할 벡터
     * @returns 두 벡터의 택시캡 거리
     */
    static distanceTaxicab(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) + Math.abs(a.w - b.w);
    }
    *[Symbol.iterator]() {
        yield* this.values;
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case "number":
                return this.length;
            case "string":
            default:
                return this.toString();
        }
    }
    /**
     * @returns 영벡터를 반환합니다.
     */
    static get zero() {
        return new IntVec4(0, 0, 0, 0);
    }
    /**
     * @returns 모든 요소가 1인 벡터를 반환합니다.
     */
    static get one() {
        return new IntVec4(1, 1, 1, 1);
    }
    /**
     * @returns 벡터의 길이의 제곱을 반환합니다.
     */
    get lengthSquared() {
        return this.values[0] * this.values[0] + this.values[1] * this.values[1] + this.values[2] * this.values[2] + this.values[3] * this.values[3];
    }
    /**
     * @alias magnitude
     * @returns 벡터의 크기를 반환합니다.
     */
    get length() {
        return Math.hypot(this.values[0], this.values[1], this.values[2], this.values[3]);
    }
    /**
     * @alias magnitude
     * @param value 벡터의 크기
     */
    set length(value) {
        const currentLength = this.length;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
        this.w *= scale;
    }
    /**
     * @alias length
     * @returns 벡터의 크기를 반환합니다.
     */
    get magnitude() {
        return Math.hypot(this.values[0], this.values[1], this.values[2], this.values[3]);
    }
    /**
     * @alias length
     * @param value 벡터의 크기
     */
    set magnitude(value) {
        const currentLength = this.magnitude;
        if (currentLength === 0)
            return;
        const scale = value / currentLength;
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
        this.w *= scale;
    }
    /**
     * @alias taxicabLength
     * @returns 벡터의 맨해튼 거리를 반환합니다.
     */
    get manhattanLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]) + Math.abs(this.values[2]) + Math.abs(this.values[3]);
    }
    /**
     * @alias manhattanLength
     * @returns 벡터의 택시캡 거리를 반환합니다.
     */
    get taxicabLength() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]) + Math.abs(this.values[2]) + Math.abs(this.values[3]);
    }
    /**
     * @returns 벡터를 복사한 새로운 Vec4 객체를 반환합니다.
     */
    get clone() {
        return new IntVec4(this.values[0], this.values[1], this.values[2], this.values[3]);
    }
    /**
     * @returns 벡터를 정규화한 새로운 Vec4 객체를 반환합니다.
     */
    get normalized() {
        const length = this.length;
        if (length === 0)
            return IntVec4.zero;
        return new IntVec4(this.values[0] / length, this.values[1] / length, this.values[2] / length, this.values[3] / length);
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get x() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set x(value) {
        this.values[0] = Math.floor(value);
    }
    /**
     * @returns 벡터의 x값을 반환합니다.
     */
    get [0]() {
        return this.values[0];
    }
    /**
     * @param value 벡터의 x값
     */
    set [0](value) {
        this.values[0] = Math.floor(value);
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
    */
    get y() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
    */
    set y(value) {
        this.values[1] = Math.floor(value);
    }
    /**
     * @returns 벡터의 y값을 반환합니다.
    */
    get [1]() {
        return this.values[1];
    }
    /**
     * @param value 벡터의 y값
    */
    set [1](value) {
        this.values[1] = Math.floor(value);
    }
    /**
     * @returns 벡터의 z값을 반환합니다.
    */
    get z() {
        return this.values[2];
    }
    /**
     * @param value 벡터의 z값
    */
    set z(value) {
        this.values[2] = Math.floor(value);
    }
    /**
     * @returns 벡터의 z값을 반환합니다.
    */
    get [2]() {
        return this.values[2];
    }
    /**
     * @param value 벡터의 z값
    */
    set [2](value) {
        this.values[2] = Math.floor(value);
    }
    /**
     * @returns 벡터의 w값을 반환합니다.
    */
    get w() {
        return this.values[2];
    }
    /**
     * @param value 벡터의 w값
    */
    set w(value) {
        this.values[3] = Math.floor(value);
    }
    /**
     * @returns 벡터의 w값을 반환합니다.
    */
    get [3]() {
        return this.values[3];
    }
    /**
     * @param value 벡터의 w값
    */
    set [3](value) {
        this.values[3] = Math.floor(value);
    }
    /**
     * @param vec 더할 벡터
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z ?? 0;
        this.w += vec.w ?? 0;
        return this;
    }
    /**
     * @param scalar 더할 스칼라
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addScalar(scalar) {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        this.w += scalar;
        return this;
    }
    /**
     * @param arr 더할 배열
     * @returns 원본 벡터에 값을 더한 후 반환합니다.
     */
    addArray(arr) {
        this.x += arr[0];
        this.y += arr[1];
        this.z += arr[2] ?? 0;
        this.w += arr[3] ?? 0;
        return this;
    }
    /**
     * @param vec 뺄 벡터
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z ?? 0;
        this.w -= vec.w ?? 0;
        return this;
    }
    /**
     * @param scalar 뺄 스칼라
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subScalar(scalar) {
        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;
        this.w -= scalar;
        return this;
    }
    /**
     * @param arr 뺄 배열
     * @returns 원본 벡터에서 값을 뺀 후 반환합니다.
     */
    subArray(arr) {
        this.x -= arr[0];
        this.y -= arr[1];
        this.z -= arr[2] ?? 0;
        this.w -= arr[3] ?? 0;
        return this;
    }
    /**
     * @param vec 곱할 벡터
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mul(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z ?? 1;
        this.w *= vec.w ?? 1;
        return this;
    }
    /**
     * @param scalar 곱할 스칼라
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }
    /**
     * @param arr 곱할 배열
     * @returns 원본 벡터에 값을 곱한 후 반환합니다.
     */
    mulArray(arr) {
        this.x *= arr[0];
        this.y *= arr[1];
        this.z *= arr[2] ?? 1;
        this.w *= arr[3] ?? 1;
        return this;
    }
    /**
     * @param vec 나눌 벡터
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    div(vec) {
        this.x /= vec.x;
        this.y /= vec.y;
        this.z /= vec.z ?? 1;
        this.w /= vec.w ?? 1;
        return this;
    }
    /**
     * @param scalar 나눌 스칼라
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    divScalar(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
        this.w /= scalar;
        return this;
    }
    /**
     * @param arr 나눌 배열
     * @returns 원본 벡터를 값으로 나눈 후 반환합니다.
     */
    divArray(arr) {
        this.x /= arr[0];
        this.y /= arr[1];
        this.z /= arr[2] ?? 1;
        this.w /= arr[3] ?? 1;
        return this;
    }
    /**
     * @param vec 나머지를 구할 벡터
     * @returns 원본 벡터에서 벡터와의 나머지를 구한 후 반환합니다.
     */
    mod(vec) {
        this.x %= vec.x;
        this.y %= vec.y;
        this.z %= vec.z ?? 1;
        this.w %= vec.w ?? 1;
        return this;
    }
    /**
     * @param scalar 나머지를 구할 스칼라
     * @returns 원본 벡터에서 스칼라와의 나머지를 구한 후 반환합니다.
     */
    modScalar(scalar) {
        this.x %= scalar;
        this.y %= scalar;
        this.z %= scalar;
        this.w %= scalar;
        return this;
    }
    /**
     * @param arr 나머지를 구할 배열
     * @returns 원본 벡터에서 배열과의 나머지를 구한 후 반환합니다.
     */
    modArray(arr) {
        this.x %= arr[0];
        this.y %= arr[1];
        this.z %= arr[2] ?? 1;
        this.w %= arr[3] ?? 1;
        return this;
    }
    /**
     * @param vec 내적할 벡터
     * @returns 두 벡터의 내적을 반환합니다.
     */
    dot(vec) {
        return this.values[0] * vec.x + this.values[1] * vec.y + this.values[2] * (vec.z ?? 0) + this.values[3] * (vec.w ?? 0);
    }
    /**
     * @returns 원본 벡터의 요소를 절댓값으로 변경한 후 반환합니다.
     */
    abs() {
        this.x = Math.abs(this.values[0]);
        this.y = Math.abs(this.values[1]);
        this.z = Math.abs(this.values[2]);
        this.w = Math.abs(this.values[3]);
        return this;
    }
    /**
     * @param func 적용할 함수
     * @returns 원본 벡터의 요소에 함수를 적용한 후 반환합니다.
     */
    do(func) {
        this.x = func(this.values[0]);
        this.y = func(this.values[1]);
        this.z = func(this.values[2]);
        this.w = func(this.values[3]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 min연산을 수행합니다.
     */
    min(vec) {
        this.x = Math.min(this.values[0], vec.x);
        this.y = Math.min(this.values[1], vec.y);
        this.z = Math.min(this.values[2], vec.z);
        this.w = Math.min(this.values[3], vec.w);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 min연산을 수행합니다.
     */
    minScalar(scalar) {
        this.x = Math.min(this.values[0], scalar);
        this.y = Math.min(this.values[1], scalar);
        this.z = Math.min(this.values[2], scalar);
        this.w = Math.min(this.values[3], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 min연산을 수행합니다.
     */
    minArr(arr) {
        this.x = Math.min(this.values[0], arr[0]);
        this.y = Math.min(this.values[1], arr[1]);
        this.z = Math.min(this.values[2], arr[2]);
        this.w = Math.min(this.values[3], arr[3]);
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 원본 벡터의 요소와 비교할 벡터에 대해서 max연산을 수행합니다.
     */
    max(vec) {
        this.x = Math.max(this.values[0], vec.x);
        this.y = Math.max(this.values[1], vec.y);
        this.z = Math.max(this.values[2], vec.z);
        this.w = Math.max(this.values[3], vec.w);
        return this;
    }
    /**
     * @param scalar 비교할 스칼라
     * @returns 원본 벡터의 요소와 비교할 스칼라에 대해서 max연산을 수행합니다.
     */
    maxScalar(scalar) {
        this.x = Math.max(this.values[0], scalar);
        this.y = Math.max(this.values[1], scalar);
        this.z = Math.max(this.values[2], scalar);
        this.w = Math.max(this.values[3], scalar);
        return this;
    }
    /**
     * @param arr 비교할 배열
     * @returns 원본 벡터의 요소와 비교할 배열에 대해서 max연산을 수행합니다.
     */
    maxArr(arr) {
        this.x = Math.max(this.values[0], arr[0]);
        this.y = Math.max(this.values[1], arr[1]);
        this.z = Math.max(this.values[2], arr[2]);
        this.w = Math.max(this.values[3], arr[3]);
        return this;
    }
    /**
     * @param min 최소 벡터
     * @param max 최대 벡터
     * @returns 원본 벡터의 요소를 최소 벡터와 최대 벡터 사이의 값으로 클램프한 후 반환합니다.
     */
    clamp(min, max) {
        this.x = Math.max(min.x, Math.min(max.x, this.values[0]));
        this.y = Math.max(min.y, Math.min(max.y, this.values[1]));
        this.z = Math.max(min.z, Math.min(max.z, this.values[2]));
        this.w = Math.max(min.w, Math.min(max.w, this.values[3]));
        return this;
    }
    /**
     * @param min 최소 스칼라
     * @param max 최대 스칼라
     * @returns 원본 벡터의 요소를 최소 스칼라와 최대 스칼라 사이의 값으로 클램프한 후 반환합니다.
     */
    clampScalar(min, max) {
        this.x = Math.max(min, Math.min(max, this.values[0]));
        this.y = Math.max(min, Math.min(max, this.values[1]));
        this.z = Math.max(min, Math.min(max, this.values[2]));
        this.w = Math.max(min, Math.min(max, this.values[3]));
        return this;
    }
    /**
     * @param min 최소 배열
     * @param max 최대 배열
     * @returns 원본 벡터의 요소를 최소 배열과 최대 배열 사이의 값으로 클램프한 후 반환합니다.
     */
    clampArr(min, max) {
        this.x = Math.max(min[0], Math.min(max[0], this.values[0]));
        this.y = Math.max(min[1], Math.min(max[1], this.values[1]));
        this.z = Math.max(min[2], Math.min(max[2], this.values[2]));
        this.w = Math.max(min[3], Math.min(max[3], this.values[3]));
        return this;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리의 제곱을 반환합니다.
     */
    distanceSquared(vec) {
        const dx = this.values[0] - vec.x;
        const dy = this.values[1] - vec.y;
        const dz = this.values[2] - vec.z;
        const dw = this.values[3] - vec.w;
        return dx * dx + dy * dy + dz * dz;
    }
    /**
     * @param vec 벡터
     * @returns 두 벡터 사이의 거리를 반환합니다.
     */
    distance(vec) {
        return Math.hypot(this.values[0] - vec.x, this.values[1] - vec.y, this.values[2] - vec.z, this.values[3] - vec.w);
    }
    /**
     * @alias taxicabDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 맨해튼 거리를 반환합니다.
     */
    manhattanDistance(vec) {
        return Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y) + Math.abs(this.values[2] - vec.z) + Math.abs(this.values[3] - vec.w);
    }
    /**
     * @alias manhattanDistance
     * @param vec 벡터
     * @returns 두 벡터 사이의 택시캡 거리를 반환합니다.
     */
    taxicabDistance(vec) {
        return Math.abs(this.values[0] - vec.x) + Math.abs(this.values[1] - vec.y) + Math.abs(this.values[2] - vec.z) + Math.abs(this.values[3] - vec.w);
    }
    /**
     * @returns 원본 벡터를 정규화한 후 반환합니다.
     */
    normalize() {
        const length = this.length;
        if (length === 0)
            return this;
        this.x /= length;
        this.y /= length;
        this.z /= length;
        this.w /= length;
        return this;
    }
    /**
     * @returns 원본 벡터의 요소를 반대로 변경한 후 반환합니다.
     */
    negate() {
        this.x = -this.values[0];
        this.y = -this.values[1];
        this.z = -this.values[2];
        this.w = -this.values[3];
        return this;
    }
    /**
     * @param vec 목표 벡터
     * @param t 진행도
     * @returns 원본 벡터를 목표 벡터로 선형 보간한 후 반환합니다.
     */
    lerp(vec, t) {
        this.x += (vec.x - this.values[0]) * t;
        this.y += (vec.y - this.values[1]) * t;
        this.z += (vec.z - this.values[2]) * t;
        this.w += (vec.w - this.values[3]) * t;
        return this;
    }
    /**
     * @param vec 비교할 벡터
     * @returns 두 벡터가 같은지 비교합니다.
     */
    equals(vec) {
        return this.x === vec.x && this.y === vec.y && this.z === vec.z && this.w === vec.w;
    }
    /**
     * @returns 벡터를 문자열 형태로 반환합니다.
     */
    toString() {
        return `(${this.values[0]}, ${this.values[1]}, ${this.values[2]}, ${this.values[3]})`;
    }
    /**
     * @returns 벡터를 객체 형태로 반환합니다.
     */
    toObject() {
        return { x: this.values[0], y: this.values[1], z: this.values[2], w: this.values[3] };
    }
    /**
     * @returns 벡터를 배열 형태로 반환합니다.
     */
    toArray() {
        return [this.values[0], this.values[1], this.values[2], this.values[3]];
    }
    /**
     * @returns 벡터를 JSON 형태로 변환합니다.
     */
    toJSON() {
        return { x: this.values[0], y: this.values[1], z: this.values[2], w: this.values[3] };
    }
}

;// ./node_modules/vecs-ts/dist/mat2.js
class Mat2 {
    constructor(a, b, c, d) {
        this.values = new Float64Array(4).fill(0);
        this.values[0] = a;
        this.values[1] = b;
        this.values[2] = c;
        this.values[3] = d;
    }
    static get identity() {
        return new Mat2(1, 0, 0, 1);
    }
    static get zero() {
        return new Mat2(0, 0, 0, 0);
    }
    static get one() {
        return new Mat2(1, 1, 1, 1);
    }
    static scalar(scalar) {
        return new Mat2(scalar, 0, 0, scalar);
    }
    static add(a, b) {
        return new Mat2(a.values[0] + b.values[0], a.values[1] + b.values[1], a.values[2] + b.values[2], a.values[3] + b.values[3]);
    }
    static sub(a, b) {
        return new Mat2(a.values[0] - b.values[0], a.values[1] - b.values[1], a.values[2] - b.values[2], a.values[3] - b.values[3]);
    }
    static mul(a, b) {
        return new Mat2(a.values[0] * b.values[0] + a.values[1] * b.values[2], a.values[0] * b.values[1] + a.values[1] * b.values[3], a.values[2] * b.values[0] + a.values[3] * b.values[2], a.values[2] * b.values[1] + a.values[3] * b.values[3]);
    }
    *getRows() {
        yield [this.values[0], this.values[1]];
        yield [this.values[2], this.values[3]];
    }
    *getColumns() {
        yield [this.values[0], this.values[2]];
        yield [this.values[1], this.values[3]];
    }
    *[Symbol.iterator]() {
        for (const e of this.values) {
            yield e;
        }
    }
    getRow(row) {
        return [this.values[row * 2], this.values[row * 2 + 1]];
    }
    getColumn(col) {
        return [this.values[col], this.values[col + 2]];
    }
    get(i, j) {
        return this.values[i * 2 + j];
    }
    set(i, j, value) {
        this.values[i * 2 + j] = value;
    }
    get diagonal() {
        return [this.values[0], this.values[3]];
    }
    get antiDiagonal() {
        return [this.values[1], this.values[2]];
    }
    get trace() {
        return this.values[0] + this.values[3];
    }
    get frobeniusNorm() {
        return Math.sqrt(this.values[0] ** 2 + this.values[1] ** 2 + this.values[2] ** 2 + this.values[3] ** 2);
    }
    get norm() {
        return Math.sqrt(this.values[0] ** 2 + this.values[1] ** 2);
    }
    get norm1() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]) + Math.abs(this.values[2]) + Math.abs(this.values[3]);
    }
    get normInf() {
        return Math.max(Math.abs(this.values[0]), Math.abs(this.values[1]), Math.abs(this.values[2]), Math.abs(this.values[3]));
    }
    get clone() {
        return new Mat2(this.values[0], this.values[1], this.values[2], this.values[3]);
    }
    get determinant() {
        return this.values[0] * this.values[3] - this.values[1] * this.values[2];
    }
    get inversed() {
        const det = this.determinant;
        if (det === 0) {
            throw new Error("This matrix is singular and cannot be inversed.");
        }
        return new Mat2(this.values[3] / det, -this.values[1] / det, -this.values[2] / det, this.values[0] / det);
    }
    get transposed() {
        return new Mat2(this.values[0], this.values[2], this.values[1], this.values[3]);
    }
    invert() {
        const det = this.determinant;
        if (det === 0) {
            throw new Error("This matrix is singular and cannot be inversed.");
        }
        [
            this.values[0], this.values[1],
            this.values[2], this.values[3]
        ] = [
            this.values[3] / det, -this.values[1] / det,
            -this.values[2] / det, this.values[0] / det
        ];
        return this;
    }
    transpose() {
        const temp = this.values[1];
        this.values[1] = this.values[2];
        this.values[2] = temp;
        return this;
    }
    addScalar(scalar) {
        this.values[0] += scalar;
        this.values[1] += scalar;
        this.values[2] += scalar;
        this.values[3] += scalar;
        return this;
    }
    subScalar(scalar) {
        this.values[0] -= scalar;
        this.values[1] -= scalar;
        this.values[2] -= scalar;
        this.values[3] -= scalar;
        return this;
    }
    mulScalar(scalar) {
        this.values[0] *= scalar;
        this.values[1] *= scalar;
        this.values[2] *= scalar;
        this.values[3] *= scalar;
        return this;
    }
    divScalar(scalar) {
        if (scalar === 0) {
            throw new Error("Division by zero");
        }
        this.values[0] /= scalar;
        this.values[1] /= scalar;
        this.values[2] /= scalar;
        this.values[3] /= scalar;
        return this;
    }
    add(matrix) {
        this.values[0] += matrix.values[0];
        this.values[1] += matrix.values[1];
        this.values[2] += matrix.values[2];
        this.values[3] += matrix.values[3];
        return this;
    }
    sub(matrix) {
        this.values[0] -= matrix.values[0];
        this.values[1] -= matrix.values[1];
        this.values[2] -= matrix.values[2];
        this.values[3] -= matrix.values[3];
        return this;
    }
    mul(matrix) {
        [
            this.values[0], this.values[1],
            this.values[2], this.values[3]
        ] = [
            this.values[0] * matrix.values[0] + this.values[1] * matrix.values[2], this.values[0] * matrix.values[1] + this.values[1] * matrix.values[3],
            this.values[2] * matrix.values[0] + this.values[3] * matrix.values[2], this.values[2] * matrix.values[1] + this.values[3] * matrix.values[3]
        ];
        return this;
    }
    toString() {
        const columnWidth1 = Math.max(this.values[0].toString().length, this.values[2].toString().length);
        const columnWidth2 = Math.max(this.values[1].toString().length, this.values[3].toString().length);
        return `┌ ${this.values[0].toString().padStart(columnWidth1, " ")} ${this.values[1].toString().padStart(columnWidth2)} ┐\n└ ${this.values[2].toString().padStart(columnWidth1, " ")} ${this.values[3].toString().padStart(columnWidth2, " ")} ┘`;
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
}
// class Mat2 {
//     private readonly values: Mat2Array = new Float64Array(4).fill(
//         0
//     ) as unknown as Mat2Array;
//     constructor(
//         m00: number = 0,
//         m01: number = 0,
//         m10: number = 0,
//         m11: number = 0
//     ) {
//         this.values[0] = m00;
//         this.values[1] = m01;
//         this.values[2] = m10;
//         this.values[3] = m11;
//     }
//     public static from(mat: Mat2): Mat2 {
//         return new Mat2(
//             mat.values[0],
//             mat.values[1],
//             mat.values[2],
//             mat.values[3]
//         );
//     }
//     public static fromScalar(scalar: number): Mat2 {
//         return new Mat2(scalar, scalar, scalar, scalar);
//     }
//     public static fromArray(arr: Mat2Array): Mat2 {
//         return new Mat2(arr[0], arr[1], arr[2], arr[3]);
//     }
//     public *[Symbol.iterator]() {
//         yield* this.values;
//     }
//     public get [Symbol.toStringTag](): string {
//         return this.constructor.name;
//     }
//     public [Symbol.toPrimitive](hint: "number" | "string" | "default") {
//         switch (hint) {
//             case "number":
//                 return this.determinant;
//             case "string":
//             default:
//                 return this.toString();
//         }
//     }
//     public static get zero(): Mat2 {
//         return new Mat2();
//     }
//     public static get identity(): Mat2 {
//         return new Mat2(1, 0, 0, 1);
//     }
//     public get determinant(): number {
//         return (
//             this.values[0] * this.values[3] - this.values[1] * this.values[2]
//         );
//     }
//     public get inversed(): Mat2 {
//         const det = this.determinant;
//         if (det === 0) {
//             throw new Error("This matrix is singular and cannot be inversed.");
//         }
//         const invDet = 1 / det;
//         return new Mat2(
//             this.values[3] * invDet,
//             -this.values[1] * invDet,
//             -this.values[2] * invDet,
//             this.values[0] * invDet
//         );
//     }
//     public get transposed(): Mat2 {
//         return new Mat2(
//             this.values[0],
//             this.values[2],
//             this.values[1],
//             this.values[3]
//         );
//     }
//     public get(i: number, j: number): number {
//         return this.values[i * 2 + j];
//     }
//     public set(i: number, j: number, value: number): void {
//         this.values[i * 2 + j] = value;
//     }
//     public getRow(i: number): Vec2 {
//         return new Vec2(this.values[i * 2], this.values[i * 2 + 1]);
//     }
//     public getColumn(j: number): Vec2 {
//         return new Vec2(this.values[j], this.values[j + 2]);
//     }
//     public toString(): string {
//         const pad1 = Math.max(
//             this.values[0].toString().length,
//             this.values[2].toString().length
//         );
//         const pad2 = Math.max(
//             this.values[1].toString().length,
//             this.values[3].toString().length
//         );
//         return `| ${this.values[0]
//             .toString()
//             .padEnd(pad1, " ")} ${this.values[1]
//             .toString()
//             .padEnd(pad2, " ")} |\n| ${this.values[2]
//             .toString()
//             .padEnd(pad1, " ")} ${this.values[3]
//             .toString()
//             .padEnd(pad2, " ")} |`;
//     }
// }
// const a = new Mat2(1, 2124155, 3, 4);
// console.log(a.toString());

;// ./node_modules/vecs-ts/dist/mat3.js
class Mat3 {
    constructor(a, b, c, d, e, f, g, h, i) {
        this.values = new Float64Array(9).fill(0);
        this.values[0] = a;
        this.values[1] = b;
        this.values[2] = c;
        this.values[3] = d;
        this.values[4] = e;
        this.values[5] = f;
        this.values[6] = g;
        this.values[7] = h;
        this.values[8] = i;
    }
    static get identity() {
        return new Mat3(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }
    static get zero() {
        return new Mat3(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static get one() {
        return new Mat3(1, 1, 1, 1, 1, 1, 1, 1, 1);
    }
    static scalar(scalar) {
        return new Mat3(scalar, 0, 0, 0, scalar, 0, 0, 0, scalar);
    }
    static add(a, b) {
        return new Mat3(a.values[0] + b.values[0], a.values[1] + b.values[1], a.values[2] + b.values[2], a.values[3] + b.values[3], a.values[4] + b.values[4], a.values[5] + b.values[5], a.values[6] + b.values[6], a.values[7] + b.values[7], a.values[8] + b.values[8]);
    }
    static sub(a, b) {
        return new Mat3(a.values[0] - b.values[0], a.values[1] - b.values[1], a.values[2] - b.values[2], a.values[3] - b.values[3], a.values[4] - b.values[4], a.values[5] - b.values[5], a.values[6] - b.values[6], a.values[7] - b.values[7], a.values[8] - b.values[8]);
    }
    static mul(a, b) {
        return new Mat3(a.values[0] * b.values[0] + a.values[1] * b.values[3] + a.values[2] * b.values[6], a.values[0] * b.values[1] + a.values[1] * b.values[4] + a.values[2] * b.values[7], a.values[0] * b.values[2] + a.values[1] * b.values[5] + a.values[2] * b.values[8], a.values[3] * b.values[0] + a.values[4] * b.values[3] + a.values[5] * b.values[6], a.values[3] * b.values[1] + a.values[4] * b.values[4] + a.values[5] * b.values[7], a.values[3] * b.values[2] + a.values[4] * b.values[5] + a.values[5] * b.values[8], a.values[6] * b.values[0] + a.values[7] * b.values[3] + a.values[8] * b.values[6], a.values[6] * b.values[1] + a.values[7] * b.values[4] + a.values[8] * b.values[7], a.values[6] * b.values[2] + a.values[7] * b.values[5] + a.values[8] * b.values[8]);
    }
    *getRows() {
        yield [this.values[0], this.values[1], this.values[2]];
        yield [this.values[3], this.values[4], this.values[5]];
        yield [this.values[6], this.values[7], this.values[8]];
    }
    *getColumns() {
        yield [this.values[0], this.values[3], this.values[6]];
        yield [this.values[1], this.values[4], this.values[7]];
        yield [this.values[2], this.values[5], this.values[8]];
    }
    *[Symbol.iterator]() {
        for (let e of this.values) {
            yield e;
        }
    }
    getRow(row) {
        return [this.values[row * 3], this.values[row * 3 + 1], this.values[row * 3 + 2]];
    }
    getColumn(col) {
        return [this.values[col], this.values[col + 3], this.values[col + 6]];
    }
    get(i, j) {
        return this.values[i * 3 + j];
    }
    set(i, j, value) {
        this.values[i * 3 + j] = value;
    }
    get diagonal() {
        return [this.values[0], this.values[4], this.values[8]];
    }
    get antiDiagonal() {
        return [this.values[2], this.values[4], this.values[6]];
    }
    get trace() {
        return this.values[0] + this.values[4] + this.values[8];
    }
    get frobeniusNorm() {
        return Math.sqrt(this.values[0] ** 2 + this.values[1] ** 2 + this.values[2] ** 2 +
            this.values[3] ** 2 + this.values[4] ** 2 + this.values[5] ** 2 +
            this.values[6] ** 2 + this.values[7] ** 2 + this.values[8] ** 2);
    }
    get norm() {
        return Math.sqrt(this.values[0] ** 2 + this.values[1] ** 2 + this.values[2] ** 2);
    }
    get norm1() {
        return Math.abs(this.values[0]) + Math.abs(this.values[1]) + Math.abs(this.values[2]) +
            Math.abs(this.values[3]) + Math.abs(this.values[4]) + Math.abs(this.values[5]) +
            Math.abs(this.values[6]) + Math.abs(this.values[7]) + Math.abs(this.values[8]);
    }
    get normInf() {
        return Math.max(Math.abs(this.values[0]), Math.abs(this.values[1]), Math.abs(this.values[2]), Math.abs(this.values[3]), Math.abs(this.values[4]), Math.abs(this.values[5]), Math.abs(this.values[6]), Math.abs(this.values[7]), Math.abs(this.values[8]));
    }
    get clone() {
        return new Mat3(this.values[0], this.values[1], this.values[2], this.values[3], this.values[4], this.values[5], this.values[6], this.values[7], this.values[8]);
    }
    get determinant() {
        return this.values[0] * (this.values[4] * this.values[8] - this.values[5] * this.values[7]) -
            this.values[1] * (this.values[3] * this.values[8] - this.values[5] * this.values[6]) +
            this.values[2] * (this.values[3] * this.values[7] - this.values[4] * this.values[6]);
    }
    getMinor(i, j) {
        const subMatrix = [];
        for (let row = 0; row < 3; row++) {
            if (row === i)
                continue;
            for (let col = 0; col < 3; col++) {
                if (col === j)
                    continue;
                subMatrix.push(this.get(row, col));
            }
        }
        return subMatrix[0] * subMatrix[3] - subMatrix[1] * subMatrix[2];
    }
    getCofactor(i, j) {
        const minor = this.getMinor(i, j);
        return ((i + j) % 2 === 0 ? minor : -minor);
    }
    get adjugate() {
        return new Mat3(this.getCofactor(0, 0), this.getCofactor(1, 0), this.getCofactor(2, 0), this.getCofactor(0, 1), this.getCofactor(1, 1), this.getCofactor(2, 1), this.getCofactor(0, 2), this.getCofactor(1, 2), this.getCofactor(2, 2));
    }
    get cofactorMatrix() {
        return new Mat3(this.getCofactor(0, 0), this.getCofactor(0, 1), this.getCofactor(0, 2), this.getCofactor(1, 0), this.getCofactor(1, 1), this.getCofactor(1, 2), this.getCofactor(2, 0), this.getCofactor(2, 1), this.getCofactor(2, 2));
    }
    get inversed() {
        const det = this.determinant;
        if (det === 0) {
            throw new Error("This matrix is singular and cannot be inversed.");
        }
        return this.adjugate.mulScalar(1 / det);
    }
    get transposed() {
        return new Mat3(this.values[0], this.values[3], this.values[6], this.values[1], this.values[4], this.values[7], this.values[2], this.values[5], this.values[8]);
    }
    invert() {
        const det = this.determinant;
        if (det === 0) {
            throw new Error("This matrix is singular and cannot be inversed.");
        }
        [
            this.values[0], this.values[1], this.values[2],
            this.values[3], this.values[4], this.values[5],
            this.values[6], this.values[7], this.values[8],
        ] = [
            this.adjugate.values[0] / det, this.adjugate.values[1] / det, this.adjugate.values[2] / det,
            this.adjugate.values[3] / det, this.adjugate.values[4] / det, this.adjugate.values[5] / det,
            this.adjugate.values[6] / det, this.adjugate.values[7] / det, this.adjugate.values[8] / det,
        ];
        return this;
    }
    transpose() {
        const temp = this.values[1];
        this.values[1] = this.values[3];
        this.values[3] = temp;
        const temp2 = this.values[2];
        this.values[2] = this.values[6];
        this.values[6] = temp2;
        const temp3 = this.values[5];
        this.values[5] = this.values[7];
        this.values[7] = temp3;
        return this;
    }
    addScalar(scalar) {
        this.values[0] += scalar;
        this.values[1] += scalar;
        this.values[2] += scalar;
        this.values[3] += scalar;
        this.values[4] += scalar;
        this.values[5] += scalar;
        this.values[6] += scalar;
        this.values[7] += scalar;
        this.values[8] += scalar;
        return this;
    }
    subScalar(scalar) {
        this.values[0] -= scalar;
        this.values[1] -= scalar;
        this.values[2] -= scalar;
        this.values[3] -= scalar;
        this.values[4] -= scalar;
        this.values[5] -= scalar;
        this.values[6] -= scalar;
        this.values[7] -= scalar;
        this.values[8] -= scalar;
        return this;
    }
    mulScalar(scalar) {
        this.values[0] *= scalar;
        this.values[1] *= scalar;
        this.values[2] *= scalar;
        this.values[3] *= scalar;
        this.values[4] *= scalar;
        this.values[5] *= scalar;
        this.values[6] *= scalar;
        this.values[7] *= scalar;
        this.values[8] *= scalar;
        return this;
    }
    divScalar(scalar) {
        if (scalar === 0) {
            throw new Error("Division by zero");
        }
        this.values[0] /= scalar;
        this.values[1] /= scalar;
        this.values[2] /= scalar;
        this.values[3] /= scalar;
        this.values[4] /= scalar;
        this.values[5] /= scalar;
        this.values[6] /= scalar;
        this.values[7] /= scalar;
        this.values[8] /= scalar;
        return this;
    }
    add(matrix) {
        this.values[0] += matrix.values[0];
        this.values[1] += matrix.values[1];
        this.values[2] += matrix.values[2];
        this.values[3] += matrix.values[3];
        this.values[4] += matrix.values[4];
        this.values[5] += matrix.values[5];
        this.values[6] += matrix.values[6];
        this.values[7] += matrix.values[7];
        this.values[8] += matrix.values[8];
        return this;
    }
    sub(matrix) {
        this.values[0] -= matrix.values[0];
        this.values[1] -= matrix.values[1];
        this.values[2] -= matrix.values[2];
        this.values[3] -= matrix.values[3];
        this.values[4] -= matrix.values[4];
        this.values[5] -= matrix.values[5];
        this.values[6] -= matrix.values[6];
        this.values[7] -= matrix.values[7];
        this.values[8] -= matrix.values[8];
        return this;
    }
    mul(matrix) {
        [
            this.values[0], this.values[1], this.values[2],
            this.values[3], this.values[4], this.values[5],
            this.values[6], this.values[7], this.values[8],
        ] = [
            this.values[0] * matrix.values[0] + this.values[1] * matrix.values[3] + this.values[2] * matrix.values[6],
            this.values[0] * matrix.values[1] + this.values[1] * matrix.values[4] + this.values[2] * matrix.values[7],
            this.values[0] * matrix.values[2] + this.values[1] * matrix.values[5] + this.values[2] * matrix.values[8],
            this.values[3] * matrix.values[0] + this.values[4] * matrix.values[3] + this.values[5] * matrix.values[6],
            this.values[3] * matrix.values[1] + this.values[4] * matrix.values[4] + this.values[5] * matrix.values[7],
            this.values[3] * matrix.values[2] + this.values[4] * matrix.values[5] + this.values[5] * matrix.values[8],
            this.values[6] * matrix.values[0] + this.values[7] * matrix.values[3] + this.values[8] * matrix.values[6],
            this.values[6] * matrix.values[1] + this.values[7] * matrix.values[4] + this.values[8] * matrix.values[7],
            this.values[6] * matrix.values[2] + this.values[7] * matrix.values[5] + this.values[8] * matrix.values[8],
        ];
        return this;
    }
    toString() {
        const columnWidth1 = Math.max(this.values[0].toString().length, this.values[3].toString().length, this.values[6].toString().length);
        const columnWidth2 = Math.max(this.values[1].toString().length, this.values[4].toString().length, this.values[7].toString().length);
        const columnWidth3 = Math.max(this.values[2].toString().length, this.values[5].toString().length, this.values[8].toString().length);
        return `┌ ${this.values[0].toString().padStart(columnWidth1, " ")} ${this.values[1].toString().padStart(columnWidth2)} ${this.values[2].toString().padStart(columnWidth3)} ┐\n│ ${this.values[3].toString().padStart(columnWidth1, " ")} ${this.values[4].toString().padStart(columnWidth2)} ${this.values[5].toString().padStart(columnWidth3)} │\n└ ${this.values[6].toString().padStart(columnWidth1, " ")} ${this.values[7].toString().padStart(columnWidth2)} ${this.values[8].toString().padStart(columnWidth3)} ┘`;
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
}

;// ./node_modules/vecs-ts/dist/mat.js



;// ./node_modules/vecs-ts/dist/vec.js








var RotationPriority;
(function (RotationPriority) {
    RotationPriority[RotationPriority["XYZ"] = 0] = "XYZ";
    RotationPriority[RotationPriority["XZY"] = 1] = "XZY";
    RotationPriority[RotationPriority["YXZ"] = 2] = "YXZ";
    RotationPriority[RotationPriority["YZX"] = 3] = "YZX";
    RotationPriority[RotationPriority["ZXY"] = 4] = "ZXY";
    RotationPriority[RotationPriority["ZYX"] = 5] = "ZYX";
})(RotationPriority || (RotationPriority = {}));

;// ./projects/dist/polygon-area/src/namespaces/ease.js
var Ease;
(function (Ease) {
    // ---------------------------------------------------------------------------
    // Type Definition for Easing Functions
    // ---------------------------------------------------------------------------
    // ---------------------------------------------------------------------------
    // Original Easing Function Implementations (앞선 답변 내용과 동일)
    // ---------------------------------------------------------------------------
    // --- 선형 ---
    const linear = (t) => t;
    // --- 2차 함수 (Quadratic) ---
    const easeInQuad = (t) => t * t;
    const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    // --- 3차 함수 (Cubic) ---
    const easeInCubic = (t) => t * t * t;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    // --- 4차 함수 (Quartic) ---
    const easeInQuart = (t) => t * t * t * t;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    // --- 5차 함수 (Quintic) ---
    const easeInQuint = (t) => t * t * t * t * t;
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
    const easeInOutQuint = (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    // --- 사인 함수 (Sinusoidal) ---
    const easeInSine = (t) => 1 - Math.cos((t * Math.PI) / 2);
    const easeOutSine = (t) => Math.sin((t * Math.PI) / 2);
    const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
    // --- 지수 함수 (Exponential) ---
    const easeInExpo = (t) => t === 0 ? 0 : Math.pow(2, 10 * t - 10);
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const easeInOutExpo = (t) => t === 0
        ? 0
        : t === 1
            ? 1
            : t < 0.5
                ? Math.pow(2, 20 * t - 10) / 2
                : (2 - Math.pow(2, -20 * t + 10)) / 2;
    // --- 원 함수 (Circular) ---
    const easeInCirc = (t) => 1 - Math.sqrt(1 - Math.pow(t, 2));
    const easeOutCirc = (t) => Math.sqrt(1 - Math.pow(t - 1, 2));
    const easeInOutCirc = (t) => t < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
    // --- Back ---
    const easeInBack = (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * t * t * t - c1 * t * t;
    };
    const easeOutBack = (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
    const easeInOutBack = (t) => {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return t < 0.5
            ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
            : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
    };
    // --- Elastic ---
    const easeInElastic = (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0
            ? 0
            : t === 1
                ? 1
                : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
    };
    const easeOutElastic = (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0
            ? 0
            : t === 1
                ? 1
                : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    };
    const easeInOutElastic = (t) => {
        const c5 = (2 * Math.PI) / 4.5;
        return t === 0
            ? 0
            : t === 1
                ? 1
                : t < 0.5
                    ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
                    : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) /
                        2 +
                        1;
    };
    // --- Bounce ---
    const easeOutBounce = (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) {
            return n1 * t * t;
        }
        else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        }
        else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        }
        else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    };
    const easeInBounce = (t) => 1 - easeOutBounce(1 - t);
    const easeInOutBounce = (t) => t < 0.5
        ? (1 - easeOutBounce(1 - 2 * t)) / 2
        : (1 + easeOutBounce(2 * t - 1)) / 2;
    // ---------------------------------------------------------------------------
    // Inverse Easing Function Implementations
    // ---------------------------------------------------------------------------
    // 역함수는 이징된 결과값(0~1)을 입력받아 원래 시간 진행률(0~1)을 반환합니다.
    // --- 선형 역함수 ---
    const inverseLinear = (p) => p;
    // --- 2차 함수 역함수 ---
    const inverseEaseInQuad = (p) => Math.sqrt(p);
    const inverseEaseOutQuad = (p) => 1 - Math.sqrt(1 - p);
    const inverseEaseInOutQuad = (p) => p < 0.5 ? Math.sqrt(p / 2) : 1 - Math.sqrt((1 - p) / 2);
    // --- 3차 함수 역함수 ---
    const inverseEaseInCubic = (p) => Math.cbrt(p);
    const inverseEaseOutCubic = (p) => 1 - Math.cbrt(1 - p);
    const inverseEaseInOutCubic = (p) => p < 0.5 ? Math.cbrt(p / 4) : 1 - Math.cbrt((1 - p) / 4);
    // --- 4차 함수 역함수 ---
    const inverseEaseInQuart = (p) => Math.pow(p, 1 / 4);
    const inverseEaseOutQuart = (p) => 1 - Math.pow(1 - p, 1 / 4);
    const inverseEaseInOutQuart = (p) => p < 0.5 ? Math.pow(p / 8, 1 / 4) : 1 - Math.pow((1 - p) / 8, 1 / 4); // Note:easeInOutQuart had factor 8, not 2
    // --- 5차 함수 역함수 ---
    const inverseEaseInQuint = (p) => Math.pow(p, 1 / 5);
    const inverseEaseOutQuint = (p) => 1 - Math.pow(1 - p, 1 / 5);
    const inverseEaseInOutQuint = (p) => p < 0.5 ? Math.pow(p / 16, 1 / 5) : 1 - Math.pow((1 - p) / 16, 1 / 5); // Note: easeInOutQuint had factor 16
    // --- 사인 함수 역함수 ---
    const inverseEaseInSine = (p) => (2 / Math.PI) * Math.asin(Math.sqrt(p)); // Note: Re-derivation -> p = 1 - cos(x) -> cos(x)=1-p -> x = acos(1-p). t = x / (PI/2). t = (2/PI)acos(1-p). Let's use simpler p = sin^2(t*PI/2)? No, original is easier.
    // Let's re-derive inverseEaseInSine: p = 1 - cos(t*PI/2). cos(t*PI/2) = 1-p. t*PI/2 = acos(1-p). t = (2/PI)*acos(1-p).
    const inverseEaseInSineDerived = (p) => (2 / Math.PI) * Math.acos(1 - p);
    const inverseEaseOutSine = (p) => (2 / Math.PI) * Math.asin(p);
    const inverseEaseInOutSine = (p) => (1 / Math.PI) * Math.acos(1 - 2 * p);
    // --- 지수 함수 역함수 ---
    const inverseEaseInExpo = (p) => p === 0 ? 0 : (Math.log2(p) + 10) / 10;
    const inverseEaseOutExpo = (p) => p === 1 ? 1 : -Math.log2(1 - p) / 10;
    const inverseEaseInOutExpo = (p) => p === 0
        ? 0
        : p === 1
            ? 1
            : p < 0.5
                ? (Math.log2(2 * p) + 10) / 20
                : (10 - Math.log2(2 - 2 * p)) / 20;
    // --- 원 함수 역함수 ---
    const inverseEaseInCirc = (p) => Math.sqrt(1 - Math.pow(1 - p, 2));
    const inverseEaseOutCirc = (p) => 1 - Math.sqrt(1 - p * p);
    const inverseEaseInOutCirc = (p) => {
        // Avoid NaN from sqrt for values slightly outside [0, 1] due to precision
        const inner = 1 - Math.pow(1 - 2 * p, 2);
        const val = Math.sqrt(Math.max(0, inner)); // Clamp inner to >= 0
        return p < 0.5 ? val / 2 : 1 - val / 2;
    };
    // --- Bounce 역함수 ---
    // inverseEaseOutBounce는 다른 Bounce 역함수에서 사용
    const inverseEaseOutBounce = (p) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        // 각 구간의 경계값 p
        const b1 = 1 / d1; // t = 1/d1 -> p = n1 * (1/d1)^2 = 7.5625 / 7.5625 = 1 ? No, t=1/d1 -> p=n1*t*t = 7.5625 * (1/2.75)^2 approx 1.
        // Let's recalculate boundaries from the original easeOutBounce's t checks
        const p1 = n1 * Math.pow(1 / d1, 2); // approx 1? No. 7.5625 * (1/2.75)^2 = 1
        // Something wrong. Ah, p=0.75, 0.9375, 0.984375 are the boundaries in p space
        const boundary1 = 0.75;
        const boundary2 = 0.9375;
        const boundary3 = 0.984375;
        if (p < boundary1) {
            // p = n1 * t^2
            return Math.sqrt(p / n1);
        }
        else if (p < boundary2) {
            // p = n1 * (t - 1.5/d1)^2 + 0.75
            return Math.sqrt((p - boundary1) / n1) + 1.5 / d1;
        }
        else if (p < boundary3) {
            // p = n1 * (t - 2.25/d1)^2 + 0.9375
            return Math.sqrt((p - boundary2) / n1) + 2.25 / d1;
        }
        else {
            // p = n1 * (t - 2.625/d1)^2 + 0.984375
            return Math.sqrt((p - boundary3) / n1) + 2.625 / d1;
        }
    };
    const inverseEaseInBounce = (p) => {
        return 1 - inverseEaseOutBounce(1 - p);
    };
    const inverseEaseInOutBounce = (p) => {
        return p < 0.5
            ? (1 - inverseEaseOutBounce(1 - 2 * p)) / 2
            : (1 + inverseEaseOutBounce(2 * p - 1)) / 2;
    };
    // ---------------------------------------------------------------------------
    // Easing Enum Definition (앞선 답변 내용과 동일)
    // ---------------------------------------------------------------------------
    /**
     * 사용 가능한 Easing 함수의 종류를 나타내는 열거형 (Enum)
     */
    let Easing;
    (function (Easing) {
        Easing[Easing["Linear"] = 0] = "Linear";
        Easing[Easing["EaseInQuad"] = 1] = "EaseInQuad";
        Easing[Easing["EaseOutQuad"] = 2] = "EaseOutQuad";
        Easing[Easing["EaseInOutQuad"] = 3] = "EaseInOutQuad";
        Easing[Easing["EaseInCubic"] = 4] = "EaseInCubic";
        Easing[Easing["EaseOutCubic"] = 5] = "EaseOutCubic";
        Easing[Easing["EaseInOutCubic"] = 6] = "EaseInOutCubic";
        Easing[Easing["EaseInQuart"] = 7] = "EaseInQuart";
        Easing[Easing["EaseOutQuart"] = 8] = "EaseOutQuart";
        Easing[Easing["EaseInOutQuart"] = 9] = "EaseInOutQuart";
        Easing[Easing["EaseInQuint"] = 10] = "EaseInQuint";
        Easing[Easing["EaseOutQuint"] = 11] = "EaseOutQuint";
        Easing[Easing["EaseInOutQuint"] = 12] = "EaseInOutQuint";
        Easing[Easing["EaseInSine"] = 13] = "EaseInSine";
        Easing[Easing["EaseOutSine"] = 14] = "EaseOutSine";
        Easing[Easing["EaseInOutSine"] = 15] = "EaseInOutSine";
        Easing[Easing["EaseInExpo"] = 16] = "EaseInExpo";
        Easing[Easing["EaseOutExpo"] = 17] = "EaseOutExpo";
        Easing[Easing["EaseInOutExpo"] = 18] = "EaseInOutExpo";
        Easing[Easing["EaseInCirc"] = 19] = "EaseInCirc";
        Easing[Easing["EaseOutCirc"] = 20] = "EaseOutCirc";
        Easing[Easing["EaseInOutCirc"] = 21] = "EaseInOutCirc";
        Easing[Easing["EaseInBack"] = 22] = "EaseInBack";
        Easing[Easing["EaseOutBack"] = 23] = "EaseOutBack";
        Easing[Easing["EaseInOutBack"] = 24] = "EaseInOutBack";
        Easing[Easing["EaseInElastic"] = 25] = "EaseInElastic";
        Easing[Easing["EaseOutElastic"] = 26] = "EaseOutElastic";
        Easing[Easing["EaseInOutElastic"] = 27] = "EaseInOutElastic";
        Easing[Easing["EaseInBounce"] = 28] = "EaseInBounce";
        Easing[Easing["EaseOutBounce"] = 29] = "EaseOutBounce";
        Easing[Easing["EaseInOutBounce"] = 30] = "EaseInOutBounce";
    })(Easing = Ease.Easing || (Ease.Easing = {}));
    // ---------------------------------------------------------------------------
    // Mapping from Enum to Function (앞선 답변 내용과 동일)
    // ---------------------------------------------------------------------------
    /** Enum 값과 원본 Easing 함수 구현을 매핑하는 객체 */
    Ease.easingFunctionMap = {
        [Easing.Linear]: linear,
        [Easing.EaseInQuad]: easeInQuad, [Easing.EaseOutQuad]: easeOutQuad, [Easing.EaseInOutQuad]: easeInOutQuad,
        [Easing.EaseInCubic]: easeInCubic, [Easing.EaseOutCubic]: easeOutCubic, [Easing.EaseInOutCubic]: easeInOutCubic,
        [Easing.EaseInQuart]: easeInQuart, [Easing.EaseOutQuart]: easeOutQuart, [Easing.EaseInOutQuart]: easeInOutQuart,
        [Easing.EaseInQuint]: easeInQuint, [Easing.EaseOutQuint]: easeOutQuint, [Easing.EaseInOutQuint]: easeInOutQuint,
        [Easing.EaseInSine]: easeInSine, [Easing.EaseOutSine]: easeOutSine, [Easing.EaseInOutSine]: easeInOutSine,
        [Easing.EaseInExpo]: easeInExpo, [Easing.EaseOutExpo]: easeOutExpo, [Easing.EaseInOutExpo]: easeInOutExpo,
        [Easing.EaseInCirc]: easeInCirc, [Easing.EaseOutCirc]: easeOutCirc, [Easing.EaseInOutCirc]: easeInOutCirc,
        [Easing.EaseInBack]: easeInBack, [Easing.EaseOutBack]: easeOutBack, [Easing.EaseInOutBack]: easeInOutBack,
        [Easing.EaseInElastic]: easeInElastic, [Easing.EaseOutElastic]: easeOutElastic, [Easing.EaseInOutElastic]: easeInOutElastic,
        [Easing.EaseInBounce]: easeInBounce, [Easing.EaseOutBounce]: easeOutBounce, [Easing.EaseInOutBounce]: easeInOutBounce,
    };
    // ---------------------------------------------------------------------------
    // Mapping from Enum to Inverse Function
    // ---------------------------------------------------------------------------
    /** Enum 값과 역함수 구현을 매핑하는 객체 (구현 안된 경우 null) */
    Ease.inverseEasingFunctionMap = {
        [Easing.Linear]: inverseLinear,
        [Easing.EaseInQuad]: inverseEaseInQuad,
        [Easing.EaseOutQuad]: inverseEaseOutQuad,
        [Easing.EaseInOutQuad]: inverseEaseInOutQuad,
        [Easing.EaseInCubic]: inverseEaseInCubic,
        [Easing.EaseOutCubic]: inverseEaseOutCubic,
        [Easing.EaseInOutCubic]: inverseEaseInOutCubic,
        [Easing.EaseInQuart]: inverseEaseInQuart,
        [Easing.EaseOutQuart]: inverseEaseOutQuart,
        [Easing.EaseInOutQuart]: inverseEaseInOutQuart,
        [Easing.EaseInQuint]: inverseEaseInQuint,
        [Easing.EaseOutQuint]: inverseEaseOutQuint,
        [Easing.EaseInOutQuint]: inverseEaseInOutQuint,
        [Easing.EaseInSine]: inverseEaseInSineDerived, // 수정된 역함수 사용
        [Easing.EaseOutSine]: inverseEaseOutSine,
        [Easing.EaseInOutSine]: inverseEaseInOutSine,
        [Easing.EaseInExpo]: inverseEaseInExpo,
        [Easing.EaseOutExpo]: inverseEaseOutExpo,
        [Easing.EaseInOutExpo]: inverseEaseInOutExpo,
        [Easing.EaseInCirc]: inverseEaseInCirc,
        [Easing.EaseOutCirc]: inverseEaseOutCirc,
        [Easing.EaseInOutCirc]: inverseEaseInOutCirc,
        [Easing.EaseInBack]: null, // 역함수 복잡하여 미구현
        [Easing.EaseOutBack]: null, // 역함수 복잡하여 미구현
        [Easing.EaseInOutBack]: null, // 역함수 복잡하여 미구현
        [Easing.EaseInElastic]: null, // 역함수 복잡하여 미구현
        [Easing.EaseOutElastic]: null, // 역함수 복잡하여 미구현
        [Easing.EaseInOutElastic]: null, // 역함수 복잡하여 미구현
        [Easing.EaseInBounce]: inverseEaseInBounce,
        [Easing.EaseOutBounce]: inverseEaseOutBounce,
        [Easing.EaseInOutBounce]: inverseEaseInOutBounce,
    };
    // ---------------------------------------------------------------------------
    // Helper Functions (Original + Inverse)
    // ---------------------------------------------------------------------------
    /**
     * Easing Enum 값에 해당하는 실제 Easing 함수를 반환합니다.
     * @param easingType - 원하는 Easing 타입 (Easing 열거형 값)
     * @returns 해당 Easing 함수. 찾지 못하면 linear 함수 반환.
     */
    function getEasingFunction(easingType) {
        const func = Ease.easingFunctionMap[easingType];
        if (!func) {
            console.warn(`Easing function for type ${Easing[easingType]} (${easingType}) not found in map. Falling back to linear.`);
            return Ease.easingFunctionMap[Easing.Linear];
        }
        return func;
    }
    Ease.getEasingFunction = getEasingFunction;
    /**
     * Easing Enum 값에 해당하는 역 Easing 함수를 반환합니다.
     * @param easingType - 원하는 Easing 타입 (Easing 열거형 값)
     * @returns 해당 역 Easing 함수. 구현되지 않았거나 찾지 못하면 null 반환.
     */
    function getInverseEasingFunction(easingType) {
        const func = Ease.inverseEasingFunctionMap[easingType];
        if (func === undefined) { // map에 키 자체가 없는 경우 (이론상 발생 안 함)
            console.warn(`Inverse easing function for type ${Easing[easingType]} (${easingType}) not found in map. Returning null.`);
            return null;
        }
        if (func === null) { // 명시적으로 미구현된 경우
            console.warn(`Inverse easing function for ${Easing[easingType]} is complex and not implemented. Returning null.`);
            return null;
        }
        return func;
    }
    Ease.getInverseEasingFunction = getInverseEasingFunction;
    // ---------------------------------------------------------------------------
    // Usage Example (Inverse Function)
    // ---------------------------------------------------------------------------
    /*
    const originalTime = 0.75;
    const easingType = Easing.EaseInOutCubic;

    // 1. 원본 함수로 이징된 값 계산
    const ease = getEasingFunction(easingType);
    const easedValue = ease(originalTime);
    console.log(`Original Time (t): ${originalTime}`);
    console.log(`Eased Value (p) using ${Easing[easingType]}: ${easedValue}`);

    // 2. 역함수로 원래 시간 복원 시도
    const inverseEase = getInverseEasingFunction(easingType);
    if (inverseEase) {
        const recoveredTime = inverseEase(easedValue);
        console.log(`Recovered Time using inverse function: ${recoveredTime}`);
        console.log(`Difference: ${Math.abs(originalTime - recoveredTime)}`); // 부동소수점 오차 확인
    } else {
        console.log(`Inverse function for ${Easing[easingType]} is not available.`);
    }

    // --- 미구현된 역함수 테스트 ---
    const unavailableInverse = getInverseEasingFunction(Easing.EaseOutElastic);
    if (!unavailableInverse) {
        console.log('\nSuccessfully detected unavailable inverse function for EaseOutElastic.');
    }
    */
})(Ease || (Ease = {})); // End of namespace Ease

;// ./projects/dist/polygon-area/src/namespaces/canvas.js


var CanvasObjectType;
(function (CanvasObjectType) {
    CanvasObjectType[CanvasObjectType["Line"] = 0] = "Line";
    CanvasObjectType[CanvasObjectType["Circle"] = 1] = "Circle";
    CanvasObjectType[CanvasObjectType["Rectangle"] = 2] = "Rectangle";
})(CanvasObjectType || (CanvasObjectType = {}));
var Canvas;
(function (Canvas) {
    const animatingCanvasObjects = new Map();
    const completedCanvasObjects = new Map();
    let _id = 0;
    const createId = () => {
        _id++;
        return _id;
    };
    const getCtx = (canvas) => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Canvas context not found");
        }
        return ctx;
    };
    Canvas.redraw = (canvas) => {
        const ctx = getCtx(canvas);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const completed = Array.from(completedCanvasObjects.entries());
        completed.sort((a, b) => {
            return a[0] - b[0];
        });
        for (const [_, completedCanvasObject] of completed) {
            const { type } = completedCanvasObject;
            if (type === CanvasObjectType.Line) {
                const { from: f, to: t, lineWidth, color } = completedCanvasObject;
                const from = Vec2.from(f).mul({ x: canvas.width, y: canvas.height });
                const to = Vec2.from(t).mul({ x: canvas.width, y: canvas.height });
                ctx.beginPath();
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = color;
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
                ctx.closePath();
            }
            else if (type === CanvasObjectType.Circle) {
                const { center: c, radius, strokeWidth, strokeColor, fillColor } = completedCanvasObject;
                const center = Vec2.from(c).mul({ x: canvas.width, y: canvas.height });
                ctx.beginPath();
                ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
                if (strokeWidth) {
                    ctx.lineWidth = strokeWidth;
                    ctx.strokeStyle = strokeColor ?? "#ffffff";
                    ctx.stroke();
                }
                if (fillColor) {
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                }
                ctx.closePath();
            }
            else if (type === CanvasObjectType.Rectangle) {
                const { from: f, to: t, strokeWidth, strokeColor, fillColor } = completedCanvasObject;
                ctx.beginPath();
                const from = Vec2.from(f).mul({ x: canvas.width, y: canvas.height });
                const to = Vec2.from(t).mul({ x: canvas.width, y: canvas.height });
                ctx.rect(from.x, from.y, to.x - from.x, to.y - from.y);
                if (strokeWidth) {
                    ctx.lineWidth = strokeWidth;
                    ctx.strokeStyle = strokeColor ?? "#ffffff";
                    ctx.stroke();
                }
                if (fillColor) {
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                }
                ctx.closePath();
            }
        }
        const completedIds = [];
        for (const [id, animatingCanvasObject] of animatingCanvasObjects) {
            const { type, startedTime: st, duration, delay, easing } = animatingCanvasObject;
            if (delay) {
                const t = Date.now() - st;
                if (t < delay) {
                    continue;
                }
            }
            const startedTime = st + (delay ?? 0);
            if (type === CanvasObjectType.Line) {
                const { from: f, to: _to, lineWidth, color, disappearing, resolve } = animatingCanvasObject;
                const from = Vec2.from(f).mul({ x: canvas.width, y: canvas.height });
                const to = Vec2.from(_to).mul({ x: canvas.width, y: canvas.height });
                let t = (Date.now() - startedTime) / animatingCanvasObject.duration;
                if (disappearing) {
                    t = 1 - t;
                }
                if (!disappearing && t >= 1) {
                    completedCanvasObjects.set(id, {
                        type: CanvasObjectType.Line,
                        from: animatingCanvasObject.from,
                        to: animatingCanvasObject.to,
                        lineWidth: animatingCanvasObject.lineWidth,
                        color: animatingCanvasObject.color,
                    });
                    resolve(id);
                    completedIds.push(id);
                    ctx.beginPath();
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = color;
                    ctx.moveTo(from.x, from.y);
                    ctx.lineTo(to.x, to.y);
                    ctx.stroke();
                    ctx.closePath();
                    continue;
                }
                if (disappearing && t <= 0) {
                    resolve(id);
                    completedIds.push(id);
                    continue;
                }
                const easingFunction = Ease.easingFunctionMap[easing];
                const lineEnd = Vec2.from(from).lerp(to, easingFunction(t));
                ctx.beginPath();
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = color;
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(lineEnd.x, lineEnd.y);
                ctx.stroke();
                ctx.closePath();
            }
            else if (type === CanvasObjectType.Circle) {
                const { center: c, radius, strokeWidth, strokeColor, fillColor, disappearing, resolve, } = animatingCanvasObject;
                const center = Vec2.from(c).mul({ x: canvas.width, y: canvas.height });
                let t = (Date.now() - startedTime) / duration;
                if (disappearing) {
                    t = 1 - t;
                }
                if (!disappearing && t >= 1) {
                    completedCanvasObjects.set(id, {
                        type: CanvasObjectType.Circle,
                        center: c,
                        radius,
                        strokeWidth,
                        strokeColor,
                        fillColor,
                    });
                    resolve(id);
                    completedIds.push(id);
                    ctx.beginPath();
                    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
                    if (strokeWidth) {
                        ctx.lineWidth = strokeWidth;
                        ctx.strokeStyle = strokeColor ?? "#ffffff";
                        ctx.stroke();
                    }
                    if (fillColor) {
                        ctx.fillStyle = fillColor;
                        ctx.fill();
                    }
                    ctx.closePath();
                    continue;
                }
                if (disappearing && t <= 0) {
                    resolve(id);
                    completedIds.push(id);
                    continue;
                }
                const easingFunction = Ease.easingFunctionMap[easing];
                const currentRadius = radius * easingFunction(t);
                ctx.beginPath();
                ctx.arc(center.x, center.y, currentRadius, 0, Math.PI * 2);
                if (strokeWidth) {
                    ctx.lineWidth = strokeWidth;
                    ctx.strokeStyle = strokeColor ?? "#ffffff";
                    ctx.stroke();
                }
                if (fillColor) {
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                }
                ctx.closePath();
            }
            else if (type === CanvasObjectType.Rectangle) {
                const { from: f, to: _to, strokeWidth, strokeColor, fillColor, disappearing, resolve, } = animatingCanvasObject;
                const from = Vec2.from(f).mul({ x: canvas.width, y: canvas.height });
                const to = Vec2.from(_to).mul({ x: canvas.width, y: canvas.height });
                let t = (Date.now() - startedTime) / duration;
                if (disappearing) {
                    t = 1 - t;
                }
                if (!disappearing && t >= 1) {
                    completedCanvasObjects.set(id, {
                        type: CanvasObjectType.Rectangle,
                        from: f,
                        to: _to,
                        strokeWidth,
                        strokeColor,
                        fillColor,
                    });
                    resolve(id);
                    completedIds.push(id);
                    ctx.beginPath();
                    ctx.rect(from.x, from.y, to.x - from.x, to.y - from.y);
                    if (strokeWidth) {
                        ctx.lineWidth = strokeWidth;
                        ctx.strokeStyle = strokeColor ?? "#ffffff";
                        ctx.stroke();
                    }
                    if (fillColor) {
                        ctx.fillStyle = fillColor;
                        ctx.fill();
                    }
                    ctx.closePath();
                    continue;
                }
                if (disappearing && t <= 0) {
                    resolve(id);
                    completedIds.push(id);
                    continue;
                }
                const easingFunction = Ease.easingFunctionMap[easing];
                const center = Vec2.add(from, to).mulScalar(0.5);
                const currentFrom = center.clone.lerp(from, easingFunction(t));
                const currentTo = center.clone.lerp(to, easingFunction(t));
                ctx.beginPath();
                ctx.rect(currentFrom.x, currentFrom.y, currentTo.x - currentFrom.x, currentTo.y - currentFrom.y);
                if (strokeWidth) {
                    ctx.lineWidth = strokeWidth;
                    ctx.strokeStyle = strokeColor ?? "#ffffff";
                    ctx.stroke();
                }
                if (fillColor) {
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                }
                ctx.closePath();
            }
        }
        for (const id of completedIds) {
            animatingCanvasObjects.delete(id);
        }
    };
    Canvas.init = (canvas) => {
        setInterval(() => {
            Canvas.redraw(canvas);
        }, 1000 / 60);
    };
    Canvas.destroy = (id) => {
        completedCanvasObjects.delete(id);
        animatingCanvasObjects.delete(id);
    };
    Canvas.disappear = async (id, options) => {
        const completedCanvasObject = completedCanvasObjects.get(id);
        if (!completedCanvasObject) {
            const animatingCanvasObject = animatingCanvasObjects.get(id);
            if (!animatingCanvasObject)
                return;
            const { disappearing } = animatingCanvasObject;
            if (disappearing)
                return;
            animatingCanvasObject.disappearing = true;
            return new Promise(r => {
                animatingCanvasObject.resolve = (id) => {
                    r();
                };
            });
        }
        return new Promise(r => {
            const resolve = (id) => {
                r();
            };
            const animatingCanvasObject = {
                ...completedCanvasObject,
                startedTime: Date.now(),
                duration: options.duration,
                disappearing: true,
                easing: options.easing ?? Ease.Easing.EaseInOutSine, // Added easing property
                resolve,
            };
            completedCanvasObjects.delete(id);
            animatingCanvasObjects.set(id, animatingCanvasObject);
        });
    };
    Canvas.disappearSync = (id, options) => {
        const completedCanvasObject = completedCanvasObjects.get(id);
        if (!completedCanvasObject) {
            const animatingCanvasObject = animatingCanvasObjects.get(id);
            if (!animatingCanvasObject)
                return;
            const { disappearing } = animatingCanvasObject;
            if (disappearing)
                return;
            animatingCanvasObject.disappearing = true;
            return;
        }
        const animatingCanvasObject = {
            ...completedCanvasObject,
            startedTime: Date.now(),
            duration: options.duration,
            disappearing: true,
            easing: options.easing ?? Ease.Easing.EaseInOutSine, // Added easing property
            resolve: (id) => { },
        };
        completedCanvasObjects.delete(id);
        animatingCanvasObjects.set(id, animatingCanvasObject);
    };
    Canvas.drawLine = async (canvas, options) => {
        return new Promise(r => {
            const id = createId();
            const { from: f, to: t, lineWidth, color, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
            const from = Vec2.from(f).div({ x: canvas.width, y: canvas.height });
            const to = Vec2.from(t).div({ x: canvas.width, y: canvas.height });
            const startTime = Date.now();
            const resolve = (id) => {
                r(id);
            };
            if (duration <= 0) {
                const completedCanvasObject = {
                    type: CanvasObjectType.Line,
                    from,
                    to,
                    lineWidth,
                    color,
                };
                completedCanvasObjects.set(id, completedCanvasObject);
            }
            else {
                const animatingCanvasObject = {
                    type: CanvasObjectType.Line,
                    startedTime: startTime,
                    duration,
                    delay,
                    disappearing: false,
                    easing,
                    from,
                    to,
                    lineWidth,
                    color,
                    resolve,
                };
                animatingCanvasObjects.set(id, animatingCanvasObject);
            }
        });
    };
    Canvas.drawLineSync = (canvas, options) => {
        const id = createId();
        const { from: f, to: t, lineWidth, color, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
        const from = Vec2.from(f).div({ x: canvas.width, y: canvas.height });
        const to = Vec2.from(t).div({ x: canvas.width, y: canvas.height });
        const startTime = Date.now();
        if (duration <= 0) {
            const completedCanvasObject = {
                type: CanvasObjectType.Line,
                from,
                to,
                lineWidth,
                color,
            };
            completedCanvasObjects.set(id, completedCanvasObject);
        }
        else {
            const animatingCanvasObject = {
                type: CanvasObjectType.Line,
                startedTime: startTime,
                duration,
                delay,
                disappearing: false,
                easing,
                from,
                to,
                lineWidth,
                color,
                resolve: (id) => { },
            };
            animatingCanvasObjects.set(id, animatingCanvasObject);
        }
        return id;
    };
    Canvas.drawCircle = async (canvas, options) => {
        return new Promise(r => {
            const id = createId();
            const { center: c, radius, strokeWidth, strokeColor, fillColor, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
            const center = Vec2.from(c).div({ x: canvas.width, y: canvas.height });
            const startTime = Date.now();
            const resolve = (id) => {
                r(id);
            };
            if (duration <= 0) {
                const completedCanvasObject = {
                    type: CanvasObjectType.Circle,
                    center,
                    radius,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                };
                completedCanvasObjects.set(id, completedCanvasObject);
            }
            else {
                const animatingCanvasObject = {
                    type: CanvasObjectType.Circle,
                    startedTime: startTime,
                    duration,
                    delay,
                    disappearing: false,
                    easing,
                    center,
                    radius,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    resolve,
                };
                animatingCanvasObjects.set(id, animatingCanvasObject);
            }
        });
    };
    Canvas.drawCircleSync = (canvas, options) => {
        const id = createId();
        const { center: c, radius, strokeWidth, strokeColor, fillColor, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
        const center = Vec2.from(c).div({ x: canvas.width, y: canvas.height });
        const startTime = Date.now();
        if (duration <= 0) {
            const completedCanvasObject = {
                type: CanvasObjectType.Circle,
                center,
                radius,
                strokeWidth,
                strokeColor,
                fillColor,
            };
            completedCanvasObjects.set(id, completedCanvasObject);
        }
        else {
            const animatingCanvasObject = {
                type: CanvasObjectType.Circle,
                startedTime: startTime,
                duration,
                delay,
                disappearing: false,
                easing,
                center,
                radius,
                strokeWidth,
                strokeColor,
                fillColor,
                resolve: (id) => { },
            };
            animatingCanvasObjects.set(id, animatingCanvasObject);
        }
        return id;
    };
    Canvas.drawRectangle = async (canvas, options) => {
        return new Promise(r => {
            const id = createId();
            const { from: f, to: t, strokeWidth, strokeColor, fillColor, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
            const from = Vec2.from(f).div({ x: canvas.width, y: canvas.height });
            const to = Vec2.from(t).div({ x: canvas.width, y: canvas.height });
            const startTime = Date.now();
            const resolve = (id) => {
                r(id);
            };
            if (duration <= 0) {
                const completedCanvasObject = {
                    type: CanvasObjectType.Rectangle,
                    from,
                    to,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                };
                completedCanvasObjects.set(id, completedCanvasObject);
            }
            else {
                const animatingCanvasObject = {
                    type: CanvasObjectType.Rectangle,
                    startedTime: startTime,
                    duration,
                    delay,
                    disappearing: false,
                    easing,
                    from,
                    to,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    resolve,
                };
                animatingCanvasObjects.set(id, animatingCanvasObject);
            }
        });
    };
    Canvas.drawRectangleSync = (canvas, options) => {
        const id = createId();
        const { from: f, to: t, strokeWidth, strokeColor, fillColor, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
        const from = Vec2.from(f).div({ x: canvas.width, y: canvas.height });
        const to = Vec2.from(t).div({ x: canvas.width, y: canvas.height });
        const startTime = Date.now();
        if (duration <= 0) {
            const completedCanvasObject = {
                type: CanvasObjectType.Rectangle,
                from,
                to,
                strokeWidth,
                strokeColor,
                fillColor,
            };
            completedCanvasObjects.set(id, completedCanvasObject);
        }
        else {
            const animatingCanvasObject = {
                type: CanvasObjectType.Rectangle,
                startedTime: startTime,
                duration,
                delay,
                disappearing: false,
                easing,
                from,
                to,
                strokeWidth,
                strokeColor,
                fillColor,
                resolve: (id) => { },
            };
            animatingCanvasObjects.set(id, animatingCanvasObject);
        }
        return id;
    };
})(Canvas || (Canvas = {}));

;// ./projects/dist/polygon-area/src/index.js



const pixelPerUnit = 50;
const drawAxis = (canvas) => {
    Canvas.drawRectangle(canvas, {
        from: Vec2.zero,
        to: new Vec2(canvas.width, canvas.height),
        fillColor: "#000000",
        duration: 0,
    });
    const duration = 1000;
    const easing = Ease.Easing.EaseInOutExpo;
    const inverseEasingFunction = Ease.inverseEasingFunctionMap[easing];
    if (inverseEasingFunction === null) {
        throw new Error(`Easing function ${easing} not found`);
    }
    for (let i = pixelPerUnit; i < canvas.width / 2; i += pixelPerUnit) {
        const n = i / pixelPerUnit;
        const positive = canvas.width / 2 + i;
        const negative = canvas.width / 2 - i;
        let lineWidth;
        let color;
        if (n % 2 === 0) {
            lineWidth = 1;
            color = "#58C4DD";
        }
        else {
            lineWidth = 0.5;
            color = "#C7E9F1";
        }
        const x = i / (canvas.width / 2);
        const waitingTime = inverseEasingFunction(x) * duration;
        // setTimeout(() => {
        Canvas.drawLine(canvas, {
            from: new Vec2(positive, canvas.height / 2),
            to: new Vec2(positive, 0),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(positive, canvas.height / 2),
            to: new Vec2(positive, canvas.height),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(negative, canvas.height / 2),
            to: new Vec2(negative, 0),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(negative, canvas.height / 2),
            to: new Vec2(negative, canvas.height),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
    }
    console.log(canvas.height / 2);
    for (let i = pixelPerUnit; i < canvas.height / 2; i += pixelPerUnit) {
        const n = i / pixelPerUnit;
        console.log(n, i);
        const positive = canvas.height / 2 + i;
        const negative = canvas.height / 2 - i;
        let lineWidth;
        let color;
        if (n % 2 === 0) {
            lineWidth = 1;
            color = "#58C4DD";
        }
        else {
            lineWidth = 0.5;
            color = "#C7E9F1";
        }
        const x = i / (canvas.height / 2);
        const waitingTime = inverseEasingFunction(x) * duration;
        console.log(waitingTime, x, duration);
        Canvas.drawLine(canvas, {
            from: new Vec2(canvas.width / 2, positive),
            to: new Vec2(0, positive),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(canvas.width / 2, positive),
            to: new Vec2(canvas.width, positive),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(canvas.width / 2, negative),
            to: new Vec2(0, negative),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(canvas.width / 2, negative),
            to: new Vec2(canvas.width, negative),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
    }
    Canvas.drawLine(canvas, {
        from: new Vec2(canvas.width / 2, canvas.height / 2),
        to: new Vec2(canvas.width, canvas.height / 2),
        lineWidth: 2,
        color: "white",
        duration,
        easing
    });
    Canvas.drawLine(canvas, {
        from: new Vec2(canvas.width / 2, canvas.height / 2),
        to: new Vec2(0, canvas.height / 2),
        lineWidth: 2,
        color: "white",
        duration,
        easing
    });
    Canvas.drawLine(canvas, {
        from: new Vec2(canvas.width / 2, canvas.height / 2),
        to: new Vec2(canvas.width / 2, canvas.height),
        lineWidth: 2,
        color: "white",
        duration,
        easing
    });
    Canvas.drawLine(canvas, {
        from: new Vec2(canvas.width / 2, canvas.height / 2),
        to: new Vec2(canvas.width / 2, 0),
        lineWidth: 2,
        color: "white",
        duration,
        easing
    });
};
const points = [];
const pointIds = [];
const lineIds = [];
const drawPoint = (canvas, x, y) => {
    const before = points[points.length - 1];
    const point = new Vec2(x / canvas.width, (canvas.height - y) / canvas.height);
    if (before) {
        const distance = point.distance(before);
        if (distance < 0.0001) {
            return;
        }
    }
    points.push(point);
    pointIds.push(Canvas.drawCircleSync(canvas, {
        center: point.clone.mul(new Vec2(canvas.width, canvas.height)),
        radius: points.length == 1 ? 8 : 5,
        fillColor: "#FFFFFF",
        duration: 500,
        easing: Ease.Easing.EaseInOutSine
    }));
    if (points.length > 3) {
        Canvas.disappear(lineIds.pop(), {
            duration: 250
        });
    }
    if (points.length > 1) {
        const id = Canvas.drawLineSync(canvas, {
            from: points[points.length - 2].clone.mul(new Vec2(canvas.width, canvas.height)),
            to: points[points.length - 1].clone.mul(new Vec2(canvas.width, canvas.height)),
            lineWidth: 2,
            color: "#FFFFFF",
            duration: 250,
            easing: Ease.Easing.EaseInOutSine
        });
        lineIds.push(id);
    }
    if (points.length > 2) {
        const id = Canvas.drawLineSync(canvas, {
            from: points[0].clone.mul(new Vec2(canvas.width, canvas.height)),
            to: points[points.length - 1].clone.mul(new Vec2(canvas.width, canvas.height)),
            lineWidth: 2,
            color: "#FFFFFF",
            duration: 250,
            easing: Ease.Easing.EaseInOutSine
        });
        lineIds.push(id);
    }
};
const main = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to get canvas context");
        return;
    }
    const resizeCanvas = () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        console.log(window.innerWidth, window.innerHeight);
        console.log(canvas.width, canvas.height);
        Canvas.redraw(canvas);
    };
    resizeCanvas();
    Canvas.init(canvas);
    // Canvas.drawLine(canvas, {
    //     from: new Vec2(0, 0),
    //     to: new Vec2(canvas.width, canvas.height),
    //     lineWidth: 2,
    //     color: "#FC6255",
    //     duration: 0,
    // })
    drawAxis(canvas);
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("click", eventData => {
        const rect = canvas.getBoundingClientRect();
        const x = eventData.clientX - rect.left;
        const y = eventData.clientY - rect.top;
        drawPoint(canvas, x, canvas.height - y);
        Canvas.redraw(canvas);
    });
    const calculate = () => {
        // 신발끈 공식
        const pl = points.map(p => p.clone.subScalar(0.5).mul(new Vec2(canvas.width, canvas.height)).divScalar(pixelPerUnit).round(12));
        let value = 0;
        for (let i = 0; i < pl.length; i++) {
            if (i !== pl.length) {
                value += pl[i].x * pl[(i + 1) % pl.length].y;
            }
            if (i !== 0) {
                value -= pl[i].x * pl[i - 1].y;
            }
        }
        drawCalculateProcess();
        return Math.abs(value) / 2;
    };
    const wait = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    const drawCalculateProcess = async () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Failed to get canvas context");
            return;
        }
        ctx.strokeStyle = "#FC6255";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#C9E2AE";
        const o = new Vec2(canvas.width / 2, canvas.height / 2);
        for (let i = 0; i < points.length; i++) {
            if (i == 0)
                continue;
            const p1 = points[i];
            const p2 = points[(i + 1) % points.length];
            const op1 = p1.clone.mul(new Vec2(canvas.width, canvas.height)).sub(o);
            const op2 = p2.clone.mul(new Vec2(canvas.width, canvas.height)).sub(o);
            let color;
            if (Math.sign(op1.cross(op2)) === 1) {
                color = "#9CDCEB";
            }
            else {
                color = "#FC6255";
            }
            // 삼각형 p1 p2 o 그리기
            await wait(1000);
        }
    };
    const l = 100;
    const offset = new Vec2(200, 200);
    // drawPoint(canvas, canvas.width / 2 + offset.x, canvas.height / 2 + offset.y);
    // drawPoint(canvas, canvas.width / 2 + l + offset.x, canvas.height / 2 + offset.y);
    // drawPoint(canvas, canvas.width / 2 + l + offset.x, canvas.height / 2 + l + offset.y);
    // drawPoint(canvas, canvas.width / 2 + offset.x, canvas.height / 2 + l + offset.y);
    Canvas.redraw(canvas);
    const disappearOptions = {
        duration: 250
    };
    window.addEventListener("keydown", async (eventData) => {
        if (eventData.key === "Backspace") {
            points.pop();
            const id = pointIds.pop();
            if (id !== undefined) {
                Canvas.disappear(id, disappearOptions);
            }
            const lineId = lineIds.pop();
            if (lineId !== undefined) {
                Canvas.disappear(lineId, disappearOptions);
            }
            if (points.length > 1) {
                const lineId2 = lineIds.pop();
                if (lineId2 !== undefined) {
                    Canvas.disappear(lineId2, disappearOptions);
                }
            }
            if (points.length > 2) {
                const id = Canvas.drawLineSync(canvas, {
                    from: points[points.length - 1].clone.mul(new Vec2(canvas.width, canvas.height)),
                    to: points[0].clone.mul(new Vec2(canvas.width, canvas.height)),
                    lineWidth: 2,
                    color: "#FFFFFF",
                    duration: 250,
                    easing: Ease.Easing.EaseInOutSine
                });
                lineIds.push(id);
            }
            Canvas.redraw(canvas);
        }
        else if (eventData.key === "c") {
            for (let i = 0; i < points.length; i++) {
                const id = pointIds[i];
                if (id !== undefined) {
                    Canvas.disappear(id, disappearOptions);
                }
            }
            points.length = 0;
            pointIds.length = 0;
            for (let i = 0; i < lineIds.length; i++) {
                const id = lineIds[i];
                if (id !== undefined) {
                    Canvas.disappear(id, disappearOptions);
                }
            }
            lineIds.length = 0;
            Canvas.redraw(canvas);
        }
        else if (eventData.key === "Enter") {
            console.log("start calculating");
            console.log(calculate());
            // Canvas.drawCircle(canvas, {
            //     center: new Vec2(canvas.width / 2, canvas.height / 2),
            //     radius: 100,
            //     strokeWidth: 2,
            //     strokeColor: "#FC6255",
            //     fillColor: "#C9E2AE",
            //     duration: 1000,
            //     easing: Ease.Easing.EaseInOutSine
            // })
        }
    });
};
window.addEventListener("DOMContentLoaded", main);

/******/ })()
;