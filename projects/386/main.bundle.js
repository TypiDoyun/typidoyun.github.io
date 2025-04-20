"use strict";
(self["webpackChunktypidoyun_github_io"] = self["webpackChunktypidoyun_github_io"] || []).push([[386],{

/***/ 290:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _mat2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(842);
/* harmony import */ var _mat3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(625);




/***/ }),

/***/ 341:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export default */
/* harmony import */ var _quat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(365);
/* harmony import */ var _vec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(386);


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
        const v = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(this.values[0], this.values[1], this.values[2], 0);
        const radianHalf = radians / 2;
        const sin = Math.sin(radianHalf);
        const cos = Math.cos(radianHalf);
        const q = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(u.x * sin, u.y * sin, u.z * sin, cos).normalized;
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
        const qx = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(sx, 0, 0, cx);
        const qy = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(0, sy, 0, cy);
        const qz = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(0, 0, sz, cz);
        let q;
        switch (priority) {
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.XYZ:
                q = qz.mul(qy).mul(qx);
                break;
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.XZY:
                q = qy.mul(qz).mul(qx);
                break;
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.YXZ:
                q = qz.mul(qx).mul(qy);
                break;
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.YZX:
                q = qx.mul(qz).mul(qy);
                break;
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.ZXY:
                q = qy.mul(qx).mul(qz);
                break;
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.ZYX:
                q = qx.mul(qy).mul(qz);
                break;
            default:
                throw new Error("Invalid rotation priority");
        }
        const v = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(this.values[0], this.values[1], this.values[2], 0);
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


/***/ }),

/***/ 365:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Quat)
/* harmony export */ });
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


/***/ }),

/***/ 382:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export default */
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


/***/ }),

/***/ 386:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZY: () => (/* reexport safe */ _vec2_js__WEBPACK_IMPORTED_MODULE_1__.A),
/* harmony export */   eB: () => (/* reexport safe */ _vec3_js__WEBPACK_IMPORTED_MODULE_2__.A),
/* harmony export */   hf: () => (/* binding */ RotationPriority)
/* harmony export */ });
/* harmony import */ var _quat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(365);
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(818);
/* harmony import */ var _vec3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(881);
/* harmony import */ var _vec4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(580);
/* harmony import */ var _int_vec2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(382);
/* harmony import */ var _int_vec3_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(341);
/* harmony import */ var _int_vec4_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(608);
/* harmony import */ var _mat_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(290);








var RotationPriority;
(function (RotationPriority) {
    RotationPriority[RotationPriority["XYZ"] = 0] = "XYZ";
    RotationPriority[RotationPriority["XZY"] = 1] = "XZY";
    RotationPriority[RotationPriority["YXZ"] = 2] = "YXZ";
    RotationPriority[RotationPriority["YZX"] = 3] = "YZX";
    RotationPriority[RotationPriority["ZXY"] = 4] = "ZXY";
    RotationPriority[RotationPriority["ZYX"] = 5] = "ZYX";
})(RotationPriority || (RotationPriority = {}));


/***/ }),

/***/ 580:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export default */
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


/***/ }),

/***/ 608:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export default */
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


/***/ }),

/***/ 625:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export default */
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


/***/ }),

/***/ 818:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Vec2)
/* harmony export */ });
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


/***/ }),

/***/ 842:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export default */
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


/***/ }),

/***/ 881:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Vec3)
/* harmony export */ });
/* harmony import */ var _quat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(365);
/* harmony import */ var _vec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(386);


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
        const v = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(this.values[0], this.values[1], this.values[2], 0);
        const radianHalf = radians / 2;
        const sin = Math.sin(radianHalf);
        const cos = Math.cos(radianHalf);
        const q = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(u.x * sin, u.y * sin, u.z * sin, cos).normalized;
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
        const qx = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(sx, 0, 0, cx);
        const qy = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(0, sy, 0, cy);
        const qz = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(0, 0, sz, cz);
        let q;
        switch (priority) {
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.XYZ:
                q = qz.mul(qy).mul(qx);
                break;
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.XZY:
                q = qy.mul(qz).mul(qx);
                break;
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.YXZ:
                q = qz.mul(qx).mul(qy);
                break;
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.YZX:
                q = qx.mul(qz).mul(qy);
                break;
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.ZXY:
                q = qy.mul(qx).mul(qz);
                break;
            case _vec_js__WEBPACK_IMPORTED_MODULE_1__/* .RotationPriority */ .hf.ZYX:
                q = qx.mul(qy).mul(qz);
                break;
            default:
                throw new Error("Invalid rotation priority");
        }
        const v = new _quat_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(this.values[0], this.values[1], this.values[2], 0);
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


/***/ })

}]);