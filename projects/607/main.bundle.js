/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 607:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/vecs-ts/dist/vec.js
var dist_vec = __webpack_require__(386);
;// ./projects/dist/perlin/src/utils/xoshiro.js
/**
 * Xoshiro128** 알고리즘만을 사용하여 효율적이고 편향이 적은
 * 유사 난수(Pseudo-Random Number)를 생성하는 클래스입니다.
 */
class Xoshiro128PRNG {
    // PRNG 상태: 4개의 32비트 부호 없는 정수로 구성 (총 128비트)
    s;
    /**
     * Xoshiro128PRNG 인스턴스를 생성합니다.
     * @param seed 초기 시드 값 (정수). 0을 포함한 모든 정수 가능.
     */
    constructor(seed) {
        this.s = Xoshiro128PRNG._initializeState(seed); // 정적 헬퍼 사용
    }
    // --- 정적 초기화 및 검증 헬퍼 ---
    /**
     * 내부 상태를 시드로부터 초기화합니다. (SplitMix32 알고리즘 사용)
     * @param seed 초기 시드 값.
     * @returns 초기화된 128비트 상태 배열 [s0, s1, s2, s3].
     * @private 내부 및 정적 메서드에서 사용하기 위해 static으로 변경
     */
    static _initializeState(seed) {
        let z = seed >>> 0; // 시드를 32비트 부호 없는 정수로 변환
        const state = [0, 0, 0, 0];
        const nextSplitMix32 = () => {
            z = (z + 0x9e3779b9) | 0;
            let t = z ^ (z >>> 16);
            t = Math.imul(t, 0x85ebca6b);
            t = t ^ (t >>> 13);
            t = Math.imul(t, 0xc2b2ae35);
            return (t ^ (t >>> 16)) >>> 0;
        };
        state[0] = nextSplitMix32();
        state[1] = nextSplitMix32();
        state[2] = nextSplitMix32();
        state[3] = nextSplitMix32();
        if (state[0] === 0 && state[1] === 0 && state[2] === 0 && state[3] === 0) {
            state[0] = 0xdeadbeef;
        }
        return state;
    }
    /**
     * 32비트 왼쪽 회전(Rotate Left) 연산.
     * @param x 회전할 32비트 정수.
     * @param k 회전할 비트 수.
     * @returns 회전된 32비트 부호 없는 정수.
     * @private 내부 및 정적 메서드에서 사용
     */
    static _rotl(x, k) {
        return ((x << k) | (x >>> (32 - k))) >>> 0;
    }
    // --- 인스턴스 메서드 (난수 생성 로직) ---
    /**
     * Xoshiro128** 알고리즘의 핵심 로직을 실행하여
     * 다음 32비트 부호 없는 정수 난수를 생성합니다. (내부 사용)
     * @returns 원시 32비트 부호 없는 정수 난수.
     */
    _nextRaw() {
        const s = this.s;
        // 정적 메서드 사용
        const result = Math.imul(Xoshiro128PRNG._rotl(Math.imul(s[1], 5), 7), 9) >>> 0;
        const t = s[1] << 9;
        s[2] ^= s[0];
        s[3] ^= s[1];
        s[1] ^= s[2];
        s[0] ^= s[3];
        s[2] ^= t;
        s[3] = Xoshiro128PRNG._rotl(s[3], 11);
        return result;
    }
    // --- Public API (난수 생성 메서드) ---
    /**
     * 다음 난수를 생성하여 0 이상 1 미만의 부동소수점으로 반환합니다.
     * @returns 생성된 난수 ([0, 1) 범위).
     */
    nextFloat() {
        return this._nextRaw() / 4294967296; // 0x100000000
    }
    /**
     * 주어진 범위 [min, max) 사이의 부동소수점 난수를 생성합니다.
     * @param min 최솟값 (포함).
     * @param max 최댓값 (미포함).
     * @returns 범위 내의 부동소수점 난수.
     */
    nextFloatRange(min, max) {
        if (min >= max) {
            console.error("Xoshiro128PRNG.nextFloatRange: max must be greater than min.");
            throw new Error("max must be greater than min");
        }
        return min + (max - min) * this.nextFloat();
    }
    /**
     * 주어진 범위 [min, max] 사이의 정수 난수를 생성합니다.
     * @param min 최솟값 (포함).
     * @param max 최댓값 (포함).
     * @returns 범위 내의 정수 난수.
     */
    nextInt(min, max) {
        if (!Number.isInteger(min) || !Number.isInteger(max)) {
            console.error("Xoshiro128PRNG.nextInt: min and max must be integers.");
            throw new Error("min and max must be integers");
        }
        if (min > max) {
            console.error("Xoshiro128PRNG.nextInt: max must be greater than or equal to min.");
            throw new Error("max must be greater than or equal to min");
        }
        const range = max - min + 1;
        return Math.floor(this.nextFloat() * range) + min;
    }
    /**
     * 현재 PRNG의 내부 상태를 반환합니다. (디버깅 또는 상태 저장용)
     * @returns 4개의 32비트 정수로 구성된 상태 배열.
     */
    getState() {
        return [...this.s];
    }
    /**
     * PRNG의 내부 상태를 지정된 상태로 설정합니다. (상태 복원용)
     * @param state 설정할 4개의 32비트 정수 배열. 모든 요소가 0인 배열은 피해야 합니다.
     */
    setState(state) {
        if (!Array.isArray(state) || state.length !== 4) {
            throw new Error("Xoshiro128PRNG.setState: State must be an array of 4 numbers.");
        }
        if (state.every(s => s === 0)) {
            console.warn("Xoshiro128PRNG.setState: Setting state to all zeros is not recommended.");
        }
        this.s = [...state];
    }
}

;// ./projects/dist/perlin/src/utils/perlin.js
/**
 * PerlinNoise Namespace using Xoshiro128PRNG for Procedural Gradients.
 */
// Xoshiro128PRNG 클래스 import (경로는 실제 파일 위치에 맞게 조정)

// vecs-ts 라이브러리 import (경로 및 구조는 실제 라이브러리에 맞게 조정)

/**
 * @namespace PerlinNoise
 * @description Xoshiro128PRNG를 사용하여 절차적으로 그래디언트를 생성하는
 * 시드 기반 2D 및 3D Perlin-like 노이즈 함수를 제공합니다.
 * 순열 테이블(p 배열)을 사용하지 않습니다.
 * 'vecs-ts' 라이브러리를 사용하여 벡터 연산을 수행합니다.
 *
 * @version Procedural Gradient Implementation
 */
var PerlinNoise;
(function (PerlinNoise) {
    // --- 내부 헬퍼 함수 ---
    /**
     * @function fade
     * @description 6t^5 - 15t^4 + 10t^3 큐인트ic 보간 곡선을 계산합니다.
     * @param {number} t - 입력 값 (일반적으로 0과 1 사이).
     * @returns {number} 페이드 처리된 값.
     * @private
     */
    const fade = (t) => {
        return t * t * t * (t * (t * 6 - 15) + 10);
    };
    /**
     * @function lerp
     * @description 스칼라 값에 대한 선형 보간 함수.
     * @param {number} a - 시작 값.
     * @param {number} b - 종료 값.
     * @param {number} t - 보간 계수 (0과 1 사이).
     * @returns {number} 보간된 값.
     * @private
     */
    const lerp = (a, b, t) => {
        return a + t * (b - a);
    };
    /**
     * @function hashInts
     * @description 여러 정수를 입력받아 하나의 32비트 해시 값으로 조합합니다. (FNV-1a 유사 방식)
     * 좌표와 시드를 결합하여 각 그리드 포인트마다 고유한 시드를 생성하는 데 사용됩니다.
     * @param {number[]} nums - 해싱할 정수들.
     * @returns {number} 조합된 32비트 부호 없는 정수 해시 값.
     * @private
     */
    const hashInts = (...nums) => {
        let hash = 0x811c9dc5; // FNV-1a 오프셋 기본값
        for (const num of nums) {
            // 각 숫자를 XOR하고 FNV 프라임 곱셈 (32비트 정수 연산)
            hash ^= num | 0; // 정수 변환 및 XOR
            hash = Math.imul(hash, 0x01000193); // FNV 프라임 곱셈
        }
        return hash >>> 0; // 부호 없는 32비트 정수 반환
    };
    /**
     * @function gradient2D
     * @description 주어진 정수 좌표와 시드를 기반으로 절차적으로 2D 그래디언트 벡터를 생성합니다.
     * 내부적으로 Xoshiro128PRNG를 사용하여 방향을 결정합니다.
     * @param {number} ix - 정수 좌표 X.
     * @param {number} iy - 정수 좌표 Y.
     * @param {number} seed - 주 노이즈 시드.
     * @returns {Vec2} 정규화된 2D 그래디언트 벡터 (Vec2 타입).
     * @private
     */
    const gradient2D = (ix, iy, seed) => {
        // 좌표와 시드를 조합하여 이 위치만의 고유 시드 생성
        const coordSeed = hashInts(ix, iy, seed);
        // 해당 위치의 그래디언트 생성을 위한 임시 PRNG 생성
        const rng = new Xoshiro128PRNG(coordSeed);
        // 랜덤 각도를 생성하여 정규화된 그래디언트 벡터 생성
        const angle = rng.nextFloat() * 2.0 * Math.PI;
        // vecs-ts의 Vec2 생성자 사용 가정
        return new dist_vec/* Vec2 */.ZY(Math.cos(angle), Math.sin(angle));
    };
    /**
     * @function gradient3D
     * @description 주어진 정수 좌표와 시드를 기반으로 절차적으로 3D 그래디언트 벡터를 생성합니다.
     * 내부적으로 Xoshiro128PRNG를 사용하여 방향을 결정합니다.
     * @param {number} ix - 정수 좌표 X.
     * @param {number} iy - 정수 좌표 Y.
     * @param {number} iz - 정수 좌표 Z.
     * @param {number} seed - 주 노이즈 시드.
     * @returns {Vec3} 정규화된 3D 그래디언트 벡터 (Vec3 타입).
     * @private
     */
    const gradient3D = (ix, iy, iz, seed) => {
        // 좌표와 시드를 조합하여 고유 시드 생성
        const coordSeed = hashInts(ix, iy, iz, seed);
        // 임시 PRNG 생성
        const rng = new Xoshiro128PRNG(coordSeed);
        // 구면 좌표 또는 정규화된 큐브 벡터를 사용하여 그래디언트 생성
        // 여기서는 [-1, 1] 범위의 랜덤 벡터를 생성 후 정규화하는 방식을 사용 (더 간단)
        let vec;
        let lenSq;
        let attempts = 0; // 무한 루프 방지
        do {
            const x = rng.nextFloatRange(-1, 1);
            const y = rng.nextFloatRange(-1, 1);
            const z = rng.nextFloatRange(-1, 1);
            vec = new dist_vec/* Vec3 */.eB(x, y, z);
            // Vec3.dot 정적 메서드 사용 가정
            lenSq = dist_vec/* Vec3 */.eB.dot(vec, vec);
            attempts++;
            // 벡터 길이가 너무 작으면 (거의 0벡터) 다시 생성 시도
        } while (lenSq < 1e-9 && attempts < 5); // 5번 시도 후에도 0벡터면 그냥 반환
        if (lenSq < 1e-9) {
            // 극히 드문 경우: 0 벡터 대신 기본 벡터 반환
            return new dist_vec/* Vec3 */.eB(1, 0, 0);
        }
        // Vec3.normalize 정적 메서드 또는 유사 기능 사용 가정
        // return Vec3.normalize(vec);
        // normalize가 없다면:
        const invLen = 1.0 / Math.sqrt(lenSq);
        // Vec3.multiplyScalar 정적 메서드 사용 가정
        return new dist_vec/* Vec3 */.eB(vec.x * invLen, vec.y * invLen, vec.z * invLen);
    };
    // --- 공개 노이즈 함수 ---
    /**
     * @function noise2D
     * @description 주어진 2D 좌표와 시드에 대한 절차적 Perlin-like 노이즈 값을 계산합니다.
     * @param {Vec2} point - 노이즈를 계산할 2D 좌표 벡터 (Vec2 타입).
     * @param {number} seed - 노이즈 패턴을 결정하는 시드 값.
     * @returns {number} Perlin-like 노이즈 값. 결과는 대략 [-1, 1] 범위입니다.
     */
    PerlinNoise.noise2D = (point, seed) => {
        // 입력 좌표 분리 (vecs-ts 정적 메서드 사용 가정)
        // Math.floor 직접 사용 (vecs-ts에 floor 없거나 다른 방식일 경우 대비)
        const ix = Math.floor(point.x);
        const iy = Math.floor(point.y);
        const fx = point.x - ix;
        const fy = point.y - iy;
        // 페이드 함수로 보간 가중치 계산
        const u = fade(fx);
        const v = fade(fy);
        // 각 코너의 정수 좌표와 시드를 사용하여 그래디언트 벡터 생성
        const g00 = gradient2D(ix, iy, seed);
        const g10 = gradient2D(ix + 1, iy, seed);
        const g01 = gradient2D(ix, iy + 1, seed);
        const g11 = gradient2D(ix + 1, iy + 1, seed);
        // 거리 벡터 계산 (vecs-ts 정적 메서드 사용 가정)
        // 직접 계산으로 변경 (Vec2 생성자 사용)
        const d00 = new dist_vec/* Vec2 */.ZY(fx, fy);
        const d10 = new dist_vec/* Vec2 */.ZY(fx - 1, fy);
        const d01 = new dist_vec/* Vec2 */.ZY(fx, fy - 1);
        const d11 = new dist_vec/* Vec2 */.ZY(fx - 1, fy - 1);
        // 그래디언트와 거리 벡터의 내적 계산 (vecs-ts 정적 메서드 사용 가정)
        const v00 = dist_vec/* Vec2 */.ZY.dot(g00, d00);
        const v10 = dist_vec/* Vec2 */.ZY.dot(g10, d10);
        const v01 = dist_vec/* Vec2 */.ZY.dot(g01, d01);
        const v11 = dist_vec/* Vec2 */.ZY.dot(g11, d11);
        // 스칼라 값에 대해 보간 수행
        const interpX1 = lerp(v00, v10, u);
        const interpX2 = lerp(v01, v11, u);
        const noiseValue = lerp(interpX1, interpX2, v);
        // 그래디언트가 정규화되었으므로 별도 스케일링 불필요 (이론적 범위 [-1, 1])
        return noiseValue;
    };
    /**
     * @function noise3D
     * @description 주어진 3D 좌표와 시드에 대한 절차적 Perlin-like 노이즈 값을 계산합니다.
     * @param {Vec3} point - 노이즈를 계산할 3D 좌표 벡터 (Vec3 타입).
     * @param {number} seed - 노이즈 패턴을 결정하는 시드 값.
     * @returns {number} Perlin-like 노이즈 값. 결과는 대략 [-1, 1] 범위입니다.
     */
    PerlinNoise.noise3D = (point, seed) => {
        // 입력 좌표 분리
        const ix = Math.floor(point.x);
        const iy = Math.floor(point.y);
        const iz = Math.floor(point.z);
        const fx = point.x - ix;
        const fy = point.y - iy;
        const fz = point.z - iz;
        // 보간 가중치 계산
        const u = fade(fx);
        const v = fade(fy);
        const w = fade(fz);
        // 8개 코너의 그래디언트 벡터 생성
        const g000 = gradient3D(ix, iy, iz, seed);
        const g100 = gradient3D(ix + 1, iy, iz, seed);
        const g010 = gradient3D(ix, iy + 1, iz, seed);
        const g110 = gradient3D(ix + 1, iy + 1, iz, seed);
        const g001 = gradient3D(ix, iy, iz + 1, seed);
        const g101 = gradient3D(ix + 1, iy, iz + 1, seed);
        const g011 = gradient3D(ix, iy + 1, iz + 1, seed);
        const g111 = gradient3D(ix + 1, iy + 1, iz + 1, seed);
        // 거리 벡터 계산
        const d000 = new dist_vec/* Vec3 */.eB(fx, fy, fz);
        const d100 = new dist_vec/* Vec3 */.eB(fx - 1, fy, fz);
        const d010 = new dist_vec/* Vec3 */.eB(fx, fy - 1, fz);
        const d110 = new dist_vec/* Vec3 */.eB(fx - 1, fy - 1, fz);
        const d001 = new dist_vec/* Vec3 */.eB(fx, fy, fz - 1);
        const d101 = new dist_vec/* Vec3 */.eB(fx - 1, fy, fz - 1);
        const d011 = new dist_vec/* Vec3 */.eB(fx, fy - 1, fz - 1);
        const d111 = new dist_vec/* Vec3 */.eB(fx - 1, fy - 1, fz - 1);
        // 내적 계산 (vecs-ts 정적 메서드 사용 가정)
        const v000 = dist_vec/* Vec3 */.eB.dot(g000, d000);
        const v100 = dist_vec/* Vec3 */.eB.dot(g100, d100);
        const v010 = dist_vec/* Vec3 */.eB.dot(g010, d010);
        const v110 = dist_vec/* Vec3 */.eB.dot(g110, d110);
        const v001 = dist_vec/* Vec3 */.eB.dot(g001, d001);
        const v101 = dist_vec/* Vec3 */.eB.dot(g101, d101);
        const v011 = dist_vec/* Vec3 */.eB.dot(g011, d011);
        const v111 = dist_vec/* Vec3 */.eB.dot(g111, d111);
        // 3차 선형 보간
        const interpX1 = lerp(v000, v100, u);
        const interpX2 = lerp(v010, v110, u);
        const interpX3 = lerp(v001, v101, u);
        const interpX4 = lerp(v011, v111, u);
        const interpY1 = lerp(interpX1, interpX2, v);
        const interpY2 = lerp(interpX3, interpX4, v);
        const noiseValue = lerp(interpY1, interpY2, w);
        // 그래디언트가 정규화되었으므로 별도 스케일링 불필요
        return noiseValue;
    };
    /**
     * @function fbm2D
     * @description 여러 옥타브의 Perlin 노이즈를 합산하여 2D Fractal Brownian Motion (FBM) 노이즈를 계산합니다.
     * 더 상세하고 자연스러운 노이즈 패턴을 생성합니다.
     * @param {Vec2} point - FBM 노이즈를 계산할 2D 좌표 벡터 (Vec2 타입).
     * @param {number} seed - 노이즈 생성을 위한 기본 시드 값. 각 옥타브는 파생된 시드를 사용합니다.
     * @param {number} octaves - 합산할 노이즈 레이어(옥타브)의 수. 많을수록 디테일이 증가하지만 계산 비용도 증가합니다. (일반적으로 4~8 사용)
     * @param {number} persistence - 각 다음 옥타브의 진폭 감소율 (0 < persistence < 1). 낮을수록 부드러운 노이즈가 됩니다. (일반적으로 0.5 사용)
     * @param {number} lacunarity - 각 다음 옥타브의 주파수 증가율 (lacunarity > 1). 높을수록 디테일이 빠르게 추가됩니다. (일반적으로 2.0 사용)
     * @param {number} [initialAmplitude=1.0] - 첫 번째 옥타브의 진폭.
     * @param {number} [initialFrequency=1.0] - 첫 번째 옥타브의 기본 주파수 (좌표 스케일링).
     * @returns {number} 계산된 FBM 노이즈 값. 결과는 대략 [-1, 1] 범위로 정규화됩니다.
     */
    PerlinNoise.fbm2D = (point, seed, octaves, persistence, lacunarity, initialAmplitude = 1.0, initialFrequency = 1.0) => {
        let totalNoise = 0.0;
        let frequency = initialFrequency;
        let amplitude = initialAmplitude;
        let maxAmplitude = 0.0; // 정규화를 위한 최대 진폭 합계
        // octaves는 최소 1 이상이어야 함
        octaves = Math.max(1, Math.floor(octaves));
        for (let i = 0; i < octaves; i++) {
            // 현재 옥타브의 입력 좌표 계산 (좌표 스케일링)
            // vecs-ts에 multiplyScalar가 없다면 직접 계산
            const octavePoint = new dist_vec/* Vec2 */.ZY(point.x * frequency, point.y * frequency);
            // 현재 옥타브의 Perlin 노이즈 값 계산
            // 각 옥타브마다 다른 패턴을 위해 시드에 i를 더함
            const noiseValue = PerlinNoise.noise2D(octavePoint, seed + i);
            // 진폭을 적용하여 노이즈 값을 누적
            totalNoise += noiseValue * amplitude;
            // 정규화를 위해 현재 진폭을 최대 진폭 합계에 더함
            maxAmplitude += amplitude;
            // 다음 옥타브를 위해 주파수와 진폭 업데이트
            frequency *= lacunarity;
            amplitude *= persistence;
        }
        // 결과를 [-1, 1] 범위로 정규화 (최대 진폭 합계로 나눔)
        // maxAmplitude가 0이 되는 경우 방지
        if (maxAmplitude === 0) {
            return 0;
        }
        return totalNoise / maxAmplitude;
    };
    /**
     * @function fbm3D
     * @description 여러 옥타브의 Perlin 노이즈를 합산하여 3D Fractal Brownian Motion (FBM) 노이즈를 계산합니다.
     * @param {Vec3} point - FBM 노이즈를 계산할 3D 좌표 벡터 (Vec3 타입).
     * @param {number} seed - 노이즈 생성을 위한 기본 시드 값.
     * @param {number} octaves - 합산할 옥타브 수 (예: 4~8).
     * @param {number} persistence - 진폭 감소율 (예: 0.5).
     * @param {number} lacunarity - 주파수 증가율 (예: 2.0).
     * @param {number} [initialAmplitude=1.0] - 첫 번째 옥타브 진폭.
     * @param {number} [initialFrequency=1.0] - 첫 번째 옥타브 주파수.
     * @returns {number} 계산된 FBM 노이즈 값. 결과는 대략 [-1, 1] 범위로 정규화됩니다.
     */
    PerlinNoise.fbm3D = (point, seed, octaves, persistence, lacunarity, initialAmplitude = 1.0, initialFrequency = 1.0) => {
        let totalNoise = 0.0;
        let frequency = initialFrequency;
        let amplitude = initialAmplitude;
        let maxAmplitude = 0.0;
        octaves = Math.max(1, Math.floor(octaves));
        for (let i = 0; i < octaves; i++) {
            // 현재 옥타브의 입력 좌표 계산
            const octavePoint = new dist_vec/* Vec3 */.eB(point.x * frequency, point.y * frequency, point.z * frequency);
            // 현재 옥타브의 Perlin 노이즈 값 계산
            const noiseValue = PerlinNoise.noise3D(octavePoint, seed + i);
            // 노이즈 값 누적
            totalNoise += noiseValue * amplitude;
            // 최대 진폭 합계 누적
            maxAmplitude += amplitude;
            // 다음 옥타브 준비
            frequency *= lacunarity;
            amplitude *= persistence;
        }
        // 결과 정규화
        if (maxAmplitude === 0) {
            return 0;
        }
        return totalNoise / maxAmplitude;
    };
})(PerlinNoise || (PerlinNoise = {})); // End namespace PerlinNoise
// --- 사용 예시 ---
/*
// 필요한 클래스 및 함수 import 가정
import { Xoshiro128PRNG } from './xoshiro128prng';
import { Vec2, Vec3 } from 'vecs-ts'; // 실제 경로로 수정

// 노이즈 함수 사용
const noiseSeed = 12345; // 원하는 시드 값 사용

const point2D = new Vec2(3.75, 1.25);
const noiseVal2D = PerlinNoise.noise2D(point2D, noiseSeed);
console.log(`Noise at (${point2D.x}, ${point2D.y}) with seed ${noiseSeed}: ${noiseVal2D}`);

const point3D = new Vec3(0.5, 2.3, 4.8);
const noiseVal3D = PerlinNoise.noise3D(point3D, noiseSeed);
console.log(`Noise at (${point3D.x}, ${point3D.y}, ${point3D.z}) with seed ${noiseSeed}: ${noiseVal3D}`);

// 다른 시드로 같은 좌표의 노이즈 생성 -> 다른 결과 확인
const noiseSeed2 = 54321;
const noiseVal2D_seed2 = PerlinNoise.noise2D(point2D, noiseSeed2);
console.log(`Noise at (${point2D.x}, ${point2D.y}) with seed ${noiseSeed2}: ${noiseVal2D_seed2}`);

// 루프 예제
console.log("\n2D Noise Map Example (4x4) with seed " + noiseSeed);
for (let y = 0; y < 4; y++) {
    let row = "";
    for (let x = 0; x < 4; x++) {
        const p = new Vec2(x * 0.5, y * 0.5);
        // 각 픽셀/포인트에 대해 noise 함수 호출 시 동일한 seed 전달
        const noise = PerlinNoise.noise2D(p, noiseSeed);
        const normalizedNoise = (noise + 1.0) / 2.0; // [0, 1] 범위로 정규화
        row += normalizedNoise.toFixed(2) + " ";
    }
    console.log(row);
}
*/ 

;// ./projects/dist/perlin/src/worker.js
// import { Vec2 } from "vecs-ts";
// import { PerlinNoise } from "./utils/perlin";
// export type WorkerRequest = {
//     type: "create",
//     data: ImageData,
//     canvas: {
//         width: number,
//         height: number
//     }
// }
// export type WorkerResponse = {
//     type: "create",
//     status: "succeed",
//     data: ImageData
// } | {
//     type: "create",
//     status: "failed",
//     message: string
// } | {
//     type: "create",
//     status: "in-progress",
//     progress: number
// }
// self.onmessage = eventData => {
//     const receivedData = eventData.data as WorkerRequest;
//     if (receivedData.type !== "create") return;
//     const imageData = receivedData.data;
//     const canvas = receivedData.canvas;
//     let isDrawing = false;
//     if (isDrawing) {
//         self.postMessage({
//             type: "create",
//             status: "failed",
//             message: "Drawing is already in progress."
//         } satisfies WorkerResponse);
//         return;
//     }
//     isDrawing = true;
//     const data = imageData.data;
//     let progress = 0;
//     let interval = setInterval(() => {
//         self.postMessage({
//             type: "create",
//             status: "in-progress",
//             progress
//         } satisfies WorkerResponse);
//     }, 1000);
//     for (let i = 0; i < data.length / 4; i++) {
//         const pixelLocation = new Vec2(i % canvas.width, Math.floor(i / canvas.width));
//         const location = new Vec2(
//             (2 * pixelLocation.x - canvas.width) / canvas.height,
//             (2 * pixelLocation.y - canvas.height) / canvas.height
//         );
//         location.mulScalar(5); // Scale the coordinates to control the frequency of the noise
//         const noiseValue = PerlinNoise.fbm2D(location, 0, 8, 0.5, 2);
//         const colorValue = Math.min(255, Math.max(0, (noiseValue / 2 + 0.5) * 255));
//         data[i * 4] = colorValue;     // Red
//         data[i * 4 + 1] = colorValue; // Green
//         data[i * 4 + 2] = colorValue; // Blue
//         data[i * 4 + 3] = 255;        // Alpha
//         progress = i / data.length * 4;
//     }
//     clearInterval(interval);
//     self.postMessage({
//         type: "create",
//         status: "succeed",
//         data: imageData
//     } satisfies WorkerResponse);
// }
// worker.js

 // 경로가 올바른지 확인하세요.
// ======================================================
// 전역 설정 변수
// ======================================================
// 진행 상황 보고 간격 (밀리초) - 0.25초마다 보고
const REPORT_INTERVAL_MS = 250;
// 한 번에 처리할 픽셀 단위 (청크 크기) - 이 값을 조절하여 performChunk 호출 빈도를 제어합니다.
// 브라우저가 멈추지 않으면서 효율적인 값으로 테스트를 통해 결정하는 것이 좋습니다.
const CHUNK_SIZE = 10000; // 예시 값
// ======================================================
// 워커 상태 변수
// ======================================================
let _imageData = null;
let _canvas = null;
let _currentPixelIndex = 0; // 현재까지 처리한 픽셀 수
let _totalPixels = 0; // 전체 픽셀 수
let _currentIntervalId = null; // setInterval ID
let _isDrawing = false; // 현재 작업 진행 중인지 나타내는 플래그
let _isCancelled = false; // 작업 취소 요청 플래그
let _seed = 0;
let _scale = 1;
let _octaves = 4;
let _persistence = 0.5;
let _lacunarity = 2.0;
// ======================================================
// 진행 상황 보고 함수 (타이머에 의해 주기적으로 호출됨)
// ======================================================
function reportProgress() {
    // 작업 중이거나 취소되지 않았을 때만 보고
    if (!_isDrawing || _isCancelled || _totalPixels === 0) {
        return;
    }
    const progress = _currentPixelIndex / _totalPixels;
    self.postMessage({
        type: "create",
        status: "in-progress",
        progress: progress
    });
    // console.log(`Worker reporting progress: ${Math.round(progress * 100)}%`);
}
// ======================================================
// 무거운 작업을 청크 단위로 수행하는 함수
// ======================================================
function performChunk() {
    // 작업 취소 또는 완료 상태면 중단
    if (!_isDrawing || _isCancelled) {
        console.log('Worker task stopped (cancelled or already finished).');
        return;
    }
    const data = _imageData.data; // 타입 캐스팅 (TypeScript 환경에서 필요)
    const width = _canvas.width;
    const height = _canvas.height;
    const start = _currentPixelIndex;
    const end = Math.min(_currentPixelIndex + CHUNK_SIZE, _totalPixels);
    // 현재 청크 작업 수행
    for (let i = start; i < end; i++) {
        // 취소 요청이 들어오면 즉시 중단
        if (_isCancelled) {
            console.log('Worker task cancelled during chunk processing.');
            break; // 현재 청크 처리 중단
        }
        const pixelLocation = new dist_vec/* Vec2 */.ZY(i % width, Math.floor(i / width));
        const location = new dist_vec/* Vec2 */.ZY((2 * pixelLocation.x - width) / height, (2 * pixelLocation.y - height) / height);
        location.mulScalar(_scale); // Scale the coordinates
        const noiseValue = PerlinNoise.fbm2D(location, _seed, _octaves, _persistence, _lacunarity);
        const colorValue = Math.min(255, Math.max(0, (noiseValue / 2 + 0.5) * 255));
        const dataIndex = i * 4;
        data[dataIndex] = colorValue; // Red
        data[dataIndex + 1] = colorValue; // Green
        data[dataIndex + 2] = colorValue; // Blue
        data[dataIndex + 3] = 255; // Alpha
    }
    _currentPixelIndex = end; // 처리된 픽셀 수 업데이트
    // 청크 처리 후 진행 상황 보고 (타이머와는 별개로 청크 완료 시점에도 보고 가능)
    // reportProgress(); // 매 청크마다 보고하고 싶다면 이 주석을 해제하세요.
    if (_isCancelled) {
        // 청크 처리 중 취소된 경우
        cleanupTask();
        self.postMessage({
            type: "create",
            status: "cancelled",
            message: "Task was cancelled."
        });
    }
    else if (_currentPixelIndex < _totalPixels) {
        // 아직 작업이 남았다면, 다음 청크를 이벤트 루프의 끝에 예약
        // setTimeout(performChunk, 0)을 사용하여 워커가 잠시 다른 이벤트(보고 타이머 등)를 처리할 기회를 줌
        setTimeout(performChunk, 0);
    }
    else {
        // 작업 완료
        console.log('Worker task completed successfully.');
        // 최종 결과 보고
        self.postMessage({
            type: "create",
            status: "succeed",
            data: _imageData // 최종 ImageData 전송
        });
        cleanupTask();
    }
}
// ======================================================
// 작업 정리 함수
// ======================================================
function cleanupTask() {
    _isDrawing = false;
    _isCancelled = false;
    _imageData = null;
    _canvas = null;
    _currentPixelIndex = 0;
    _totalPixels = 0;
    _seed = Math.floor(Math.random() * 1000000); // 새로운 시드 생성 (다음 작업을 위해)
    if (_currentIntervalId !== null) {
        clearInterval(_currentIntervalId);
        _currentIntervalId = null;
        console.log('Progress reporting timer stopped.');
    }
}
// ======================================================
// 메인 스레드로부터 메시지 수신
// ======================================================
self.onmessage = eventData => {
    const receivedData = eventData.data; // 타입 캐스팅
    if (receivedData.type === "create") {
        // 이미 작업 중이면 요청 무시 또는 실패 보고
        if (_isDrawing) {
            self.postMessage({
                type: "create",
                status: "failed",
                message: "Drawing is already in progress."
            });
            return;
        }
        console.log('Worker received create task.');
        // 작업 상태 초기화 및 시작 준비
        _isDrawing = true;
        _isCancelled = false; // 새로운 작업 시작 시 취소 플래그 초기화
        _imageData = receivedData.data;
        _canvas = receivedData.canvas;
        _currentPixelIndex = 0;
        _totalPixels = _imageData.data.length / 4; // 픽셀 수 계산
        // 빈 데이터 예외 처리
        if (_totalPixels === 0) {
            console.log('Worker received empty image data.');
            self.postMessage({
                type: "create",
                status: "succeed",
                data: _imageData
            });
            cleanupTask(); // 상태 정리
            return;
        }
        // 진행 상황 보고 타이머 설정 (작업 시작 전)
        // 이미 타이머가 실행 중이면 새로 설정하지 않음 (다중 메시지 방지)
        if (_currentIntervalId === null) {
            _currentIntervalId = setInterval(reportProgress, REPORT_INTERVAL_MS);
            console.log(`Progress reporting timer started (${REPORT_INTERVAL_MS}ms interval).`);
        }
        // 첫 번째 청크 처리 시작
        console.log('Worker starting first chunk processing.');
        if (receivedData.seed !== undefined) {
            _seed = receivedData.seed; // 시드 설정 (기본값 0)
        }
        if (receivedData.scale !== undefined) {
            _scale = receivedData.scale; // 스케일 설정 (기본값 1)
        }
        if (receivedData.octaves !== undefined) {
            _octaves = receivedData.octaves; // 옥타브 설정 (기본값 4)
        }
        if (receivedData.persistence !== undefined) {
            _persistence = receivedData.persistence; // 지속성 설정 (기본값 0.5)
        }
        if (receivedData.lacunarity !== undefined) {
            _lacunarity = receivedData.lacunarity; // 라쿠나리티 설정 (기본값 2.0)
        }
        performChunk();
    }
    else if (receivedData.type === "cancel") {
        // 작업 취소 요청 처리 (만약 메인 스레드에서 취소 메시지를 보낸다면)
        if (_isDrawing && !_isCancelled) {
            console.log('Worker received cancel request.');
            _isCancelled = true; // 취소 플래그 설정
            // performChunk 내부 루프 또는 다음 setTimeout 호출에서 이 플래그를 확인하여 중단됩니다.
            // 즉시 중단되지 않고 현재 청크가 완료될 때까지 기다릴 수 있습니다.
        }
        else {
            console.log('Worker received cancel request, but no task is active.');
        }
    }
    else {
        // 알 수 없는 메시지 타입
        console.warn('Worker received unknown message type:', receivedData);
    }
};
console.log('Worker script loaded.'); // 워커 스크립트 로딩 확인용


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [386], () => (__webpack_require__(607)))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "/main.bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			607: 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktypidoyun_github_io"] = self["webpackChunktypidoyun_github_io"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return __webpack_require__.e(386).then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;