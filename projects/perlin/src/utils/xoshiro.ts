/**
 * Xoshiro128** 알고리즘만을 사용하여 효율적이고 편향이 적은
 * 유사 난수(Pseudo-Random Number)를 생성하는 클래스입니다.
 */
export class Xoshiro128PRNG {
    // PRNG 상태: 4개의 32비트 부호 없는 정수로 구성 (총 128비트)
    private s: [number, number, number, number];

    /**
     * Xoshiro128PRNG 인스턴스를 생성합니다.
     * @param seed 초기 시드 값 (정수). 0을 포함한 모든 정수 가능.
     */
    constructor(seed: number) {
        this.s = Xoshiro128PRNG._initializeState(seed); // 정적 헬퍼 사용
    }

    // --- 정적 초기화 및 검증 헬퍼 ---

    /**
     * 내부 상태를 시드로부터 초기화합니다. (SplitMix32 알고리즘 사용)
     * @param seed 초기 시드 값.
     * @returns 초기화된 128비트 상태 배열 [s0, s1, s2, s3].
     * @private 내부 및 정적 메서드에서 사용하기 위해 static으로 변경
     */
    private static _initializeState(seed: number): [number, number, number, number] {
        let z = seed >>> 0; // 시드를 32비트 부호 없는 정수로 변환
        const state: [number, number, number, number] = [0, 0, 0, 0];

        const nextSplitMix32 = (): number => {
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
    private static _rotl(x: number, k: number): number {
        return ((x << k) | (x >>> (32 - k))) >>> 0;
    }

    // --- 인스턴스 메서드 (난수 생성 로직) ---

    /**
     * Xoshiro128** 알고리즘의 핵심 로직을 실행하여
     * 다음 32비트 부호 없는 정수 난수를 생성합니다. (내부 사용)
     * @returns 원시 32비트 부호 없는 정수 난수.
     */
    private _nextRaw(): number {
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
    public nextFloat(): number {
        return this._nextRaw() / 4294967296; // 0x100000000
    }

    /**
     * 주어진 범위 [min, max) 사이의 부동소수점 난수를 생성합니다.
     * @param min 최솟값 (포함).
     * @param max 최댓값 (미포함).
     * @returns 범위 내의 부동소수점 난수.
     */
    public nextFloatRange(min: number, max: number): number {
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
    public nextInt(min: number, max: number): number {
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
    public getState(): [number, number, number, number] {
        return [...this.s];
    }

    /**
     * PRNG의 내부 상태를 지정된 상태로 설정합니다. (상태 복원용)
     * @param state 설정할 4개의 32비트 정수 배열. 모든 요소가 0인 배열은 피해야 합니다.
     */
    public setState(state: [number, number, number, number]): void {
        if (!Array.isArray(state) || state.length !== 4) {
            throw new Error("Xoshiro128PRNG.setState: State must be an array of 4 numbers.");
        }
        if (state.every(s => s === 0)) {
            console.warn("Xoshiro128PRNG.setState: Setting state to all zeros is not recommended.");
        }
        this.s = [...state];
    }
}