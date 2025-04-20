/**
 * PerlinNoise Namespace using Xoshiro128PRNG for Procedural Gradients.
 */

// Xoshiro128PRNG 클래스 import (경로는 실제 파일 위치에 맞게 조정)
import { Xoshiro128PRNG } from './xoshiro';
// vecs-ts 라이브러리 import (경로 및 구조는 실제 라이브러리에 맞게 조정)
import { Vec2, Vec3 } from 'vecs-ts';

/**
 * @namespace PerlinNoise
 * @description Xoshiro128PRNG를 사용하여 절차적으로 그래디언트를 생성하는
 * 시드 기반 2D 및 3D Perlin-like 노이즈 함수를 제공합니다.
 * 순열 테이블(p 배열)을 사용하지 않습니다.
 * 'vecs-ts' 라이브러리를 사용하여 벡터 연산을 수행합니다.
 *
 * @version Procedural Gradient Implementation
 */
export namespace PerlinNoise {

    // --- 내부 헬퍼 함수 ---

    /**
     * @function fade
     * @description 6t^5 - 15t^4 + 10t^3 큐인트ic 보간 곡선을 계산합니다.
     * @param {number} t - 입력 값 (일반적으로 0과 1 사이).
     * @returns {number} 페이드 처리된 값.
     * @private
     */
    const fade = (t: number): number => {
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
    const lerp = (a: number, b: number, t: number): number => {
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
    const hashInts = (...nums: number[]): number => {
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
    const gradient2D = (ix: number, iy: number, seed: number): Vec2 => {
        // 좌표와 시드를 조합하여 이 위치만의 고유 시드 생성
        const coordSeed = hashInts(ix, iy, seed);
        // 해당 위치의 그래디언트 생성을 위한 임시 PRNG 생성
        const rng = new Xoshiro128PRNG(coordSeed);
        // 랜덤 각도를 생성하여 정규화된 그래디언트 벡터 생성
        const angle = rng.nextFloat() * 2.0 * Math.PI;
        // vecs-ts의 Vec2 생성자 사용 가정
        return new Vec2(Math.cos(angle), Math.sin(angle));
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
    const gradient3D = (ix: number, iy: number, iz: number, seed: number): Vec3 => {
        // 좌표와 시드를 조합하여 고유 시드 생성
        const coordSeed = hashInts(ix, iy, iz, seed);
        // 임시 PRNG 생성
        const rng = new Xoshiro128PRNG(coordSeed);

        // 구면 좌표 또는 정규화된 큐브 벡터를 사용하여 그래디언트 생성
        // 여기서는 [-1, 1] 범위의 랜덤 벡터를 생성 후 정규화하는 방식을 사용 (더 간단)
        let vec: Vec3;
        let lenSq: number;
        let attempts = 0; // 무한 루프 방지

        do {
            const x = rng.nextFloatRange(-1, 1);
            const y = rng.nextFloatRange(-1, 1);
            const z = rng.nextFloatRange(-1, 1);
            vec = new Vec3(x, y, z);
            // Vec3.dot 정적 메서드 사용 가정
            lenSq = Vec3.dot(vec, vec);
            attempts++;
            // 벡터 길이가 너무 작으면 (거의 0벡터) 다시 생성 시도
        } while (lenSq < 1e-9 && attempts < 5); // 5번 시도 후에도 0벡터면 그냥 반환

        if (lenSq < 1e-9) {
            // 극히 드문 경우: 0 벡터 대신 기본 벡터 반환
             return new Vec3(1, 0, 0);
        }

        // Vec3.normalize 정적 메서드 또는 유사 기능 사용 가정
        // return Vec3.normalize(vec);
        // normalize가 없다면:
        const invLen = 1.0 / Math.sqrt(lenSq);
        // Vec3.multiplyScalar 정적 메서드 사용 가정
        return new Vec3(vec.x * invLen, vec.y * invLen, vec.z * invLen);
    };


    // --- 공개 노이즈 함수 ---

    /**
     * @function noise2D
     * @description 주어진 2D 좌표와 시드에 대한 절차적 Perlin-like 노이즈 값을 계산합니다.
     * @param {Vec2} point - 노이즈를 계산할 2D 좌표 벡터 (Vec2 타입).
     * @param {number} seed - 노이즈 패턴을 결정하는 시드 값.
     * @returns {number} Perlin-like 노이즈 값. 결과는 대략 [-1, 1] 범위입니다.
     */
    export const noise2D = (point: Vec2, seed: number): number => {
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
        const d00 = new Vec2(fx, fy);
        const d10 = new Vec2(fx - 1, fy);
        const d01 = new Vec2(fx, fy - 1);
        const d11 = new Vec2(fx - 1, fy - 1);

        // 그래디언트와 거리 벡터의 내적 계산 (vecs-ts 정적 메서드 사용 가정)
        const v00 = Vec2.dot(g00, d00);
        const v10 = Vec2.dot(g10, d10);
        const v01 = Vec2.dot(g01, d01);
        const v11 = Vec2.dot(g11, d11);

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
    export const noise3D = (point: Vec3, seed: number): number => {
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
        const d000 = new Vec3(fx, fy, fz);
        const d100 = new Vec3(fx - 1, fy, fz);
        const d010 = new Vec3(fx, fy - 1, fz);
        const d110 = new Vec3(fx - 1, fy - 1, fz);
        const d001 = new Vec3(fx, fy, fz - 1);
        const d101 = new Vec3(fx - 1, fy, fz - 1);
        const d011 = new Vec3(fx, fy - 1, fz - 1);
        const d111 = new Vec3(fx - 1, fy - 1, fz - 1);

        // 내적 계산 (vecs-ts 정적 메서드 사용 가정)
        const v000 = Vec3.dot(g000, d000);
        const v100 = Vec3.dot(g100, d100);
        const v010 = Vec3.dot(g010, d010);
        const v110 = Vec3.dot(g110, d110);
        const v001 = Vec3.dot(g001, d001);
        const v101 = Vec3.dot(g101, d101);
        const v011 = Vec3.dot(g011, d011);
        const v111 = Vec3.dot(g111, d111);

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
    export const fbm2D = (
        point: Vec2,
        seed: number,
        octaves: number,
        persistence: number,
        lacunarity: number,
        initialAmplitude: number = 1.0,
        initialFrequency: number = 1.0
    ): number => {
        let totalNoise = 0.0;
        let frequency = initialFrequency;
        let amplitude = initialAmplitude;
        let maxAmplitude = 0.0; // 정규화를 위한 최대 진폭 합계

        // octaves는 최소 1 이상이어야 함
        octaves = Math.max(1, Math.floor(octaves));

        for (let i = 0; i < octaves; i++) {
            // 현재 옥타브의 입력 좌표 계산 (좌표 스케일링)
            // vecs-ts에 multiplyScalar가 없다면 직접 계산
            const octavePoint = new Vec2(point.x * frequency, point.y * frequency);

            // 현재 옥타브의 Perlin 노이즈 값 계산
            // 각 옥타브마다 다른 패턴을 위해 시드에 i를 더함
            const noiseValue = noise2D(octavePoint, seed + i);

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
    export const fbm3D = (
        point: Vec3,
        seed: number,
        octaves: number,
        persistence: number,
        lacunarity: number,
        initialAmplitude: number = 1.0,
        initialFrequency: number = 1.0
    ): number => {
        let totalNoise = 0.0;
        let frequency = initialFrequency;
        let amplitude = initialAmplitude;
        let maxAmplitude = 0.0;

        octaves = Math.max(1, Math.floor(octaves));

        for (let i = 0; i < octaves; i++) {
            // 현재 옥타브의 입력 좌표 계산
            const octavePoint = new Vec3(point.x * frequency, point.y * frequency, point.z * frequency);

            // 현재 옥타브의 Perlin 노이즈 값 계산
            const noiseValue = noise3D(octavePoint, seed + i);

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

} // End namespace PerlinNoise


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