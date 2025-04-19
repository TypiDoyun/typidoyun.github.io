export namespace Ease {
    // ---------------------------------------------------------------------------
    // Type Definition for Easing Functions
    // ---------------------------------------------------------------------------

    /**
     * Easing 함수 타입 정의
     * @param t - 진행률 (0.0 ~ 1.0)
     * @returns 변환된 진행률 (0.0 ~ 1.0)
     */
    export type EasingFunction = (t: number) => number;

    // ---------------------------------------------------------------------------
    // Original Easing Function Implementations (앞선 답변 내용과 동일)
    // ---------------------------------------------------------------------------

    // --- 선형 ---
    const linear: EasingFunction = (t) => t;
    // --- 2차 함수 (Quadratic) ---
    const easeInQuad: EasingFunction = (t) => t * t;
    const easeOutQuad: EasingFunction = (t) => 1 - (1 - t) * (1 - t);
    const easeInOutQuad: EasingFunction = (t) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    // --- 3차 함수 (Cubic) ---
    const easeInCubic: EasingFunction = (t) => t * t * t;
    const easeOutCubic: EasingFunction = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic: EasingFunction = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    // --- 4차 함수 (Quartic) ---
    const easeInQuart: EasingFunction = (t) => t * t * t * t;
    const easeOutQuart: EasingFunction = (t) => 1 - Math.pow(1 - t, 4);
    const easeInOutQuart: EasingFunction = (t) =>
        t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    // --- 5차 함수 (Quintic) ---
    const easeInQuint: EasingFunction = (t) => t * t * t * t * t;
    const easeOutQuint: EasingFunction = (t) => 1 - Math.pow(1 - t, 5);
    const easeInOutQuint: EasingFunction = (t) =>
        t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    // --- 사인 함수 (Sinusoidal) ---
    const easeInSine: EasingFunction = (t) => 1 - Math.cos((t * Math.PI) / 2);
    const easeOutSine: EasingFunction = (t) => Math.sin((t * Math.PI) / 2);
    const easeInOutSine: EasingFunction = (t) =>
        -(Math.cos(Math.PI * t) - 1) / 2;
    // --- 지수 함수 (Exponential) ---
    const easeInExpo: EasingFunction = (t) =>
        t === 0 ? 0 : Math.pow(2, 10 * t - 10);
    const easeOutExpo: EasingFunction = (t) =>
        t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const easeInOutExpo: EasingFunction = (t) =>
        t === 0
            ? 0
            : t === 1
            ? 1
            : t < 0.5
            ? Math.pow(2, 20 * t - 10) / 2
            : (2 - Math.pow(2, -20 * t + 10)) / 2;
    // --- 원 함수 (Circular) ---
    const easeInCirc: EasingFunction = (t) => 1 - Math.sqrt(1 - Math.pow(t, 2));
    const easeOutCirc: EasingFunction = (t) =>
        Math.sqrt(1 - Math.pow(t - 1, 2));
    const easeInOutCirc: EasingFunction = (t) =>
        t < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
    // --- Back ---
    const easeInBack: EasingFunction = (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * t * t * t - c1 * t * t;
    };
    const easeOutBack: EasingFunction = (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
    const easeInOutBack: EasingFunction = (t) => {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return t < 0.5
            ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
            : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
    };
    // --- Elastic ---
    const easeInElastic: EasingFunction = (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0
            ? 0
            : t === 1
            ? 1
            : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
    };
    const easeOutElastic: EasingFunction = (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0
            ? 0
            : t === 1
            ? 1
            : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    };
    const easeInOutElastic: EasingFunction = (t) => {
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
    const easeOutBounce: EasingFunction = (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) { return n1 * t * t; }
        else if (t < 2 / d1) { return n1 * (t -= 1.5 / d1) * t + 0.75; }
        else if (t < 2.5 / d1) { return n1 * (t -= 2.25 / d1) * t + 0.9375; }
        else { return n1 * (t -= 2.625 / d1) * t + 0.984375; }
    };
    const easeInBounce: EasingFunction = (t) => 1 - easeOutBounce(1 - t);
    const easeInOutBounce: EasingFunction = (t) =>
        t < 0.5
            ? (1 - easeOutBounce(1 - 2 * t)) / 2
            : (1 + easeOutBounce(2 * t - 1)) / 2;

    // ---------------------------------------------------------------------------
    // Inverse Easing Function Implementations
    // ---------------------------------------------------------------------------
    // 역함수는 이징된 결과값(0~1)을 입력받아 원래 시간 진행률(0~1)을 반환합니다.

    // --- 선형 역함수 ---
    const inverseLinear: EasingFunction = (p) => p;

    // --- 2차 함수 역함수 ---
    const inverseEaseInQuad: EasingFunction = (p) => Math.sqrt(p);
    const inverseEaseOutQuad: EasingFunction = (p) => 1 - Math.sqrt(1 - p);
    const inverseEaseInOutQuad: EasingFunction = (p) =>
      p < 0.5 ? Math.sqrt(p / 2) : 1 - Math.sqrt((1 - p) / 2);

    // --- 3차 함수 역함수 ---
    const inverseEaseInCubic: EasingFunction = (p) => Math.cbrt(p);
    const inverseEaseOutCubic: EasingFunction = (p) => 1 - Math.cbrt(1 - p);
    const inverseEaseInOutCubic: EasingFunction = (p) =>
      p < 0.5 ? Math.cbrt(p / 4) : 1 - Math.cbrt((1 - p) / 4);

    // --- 4차 함수 역함수 ---
    const inverseEaseInQuart: EasingFunction = (p) => Math.pow(p, 1 / 4);
    const inverseEaseOutQuart: EasingFunction = (p) => 1 - Math.pow(1 - p, 1 / 4);
    const inverseEaseInOutQuart: EasingFunction = (p) =>
      p < 0.5 ? Math.pow(p / 8, 1 / 4) : 1 - Math.pow((1 - p) / 8, 1 / 4); // Note:easeInOutQuart had factor 8, not 2

    // --- 5차 함수 역함수 ---
    const inverseEaseInQuint: EasingFunction = (p) => Math.pow(p, 1 / 5);
    const inverseEaseOutQuint: EasingFunction = (p) => 1 - Math.pow(1 - p, 1 / 5);
    const inverseEaseInOutQuint: EasingFunction = (p) =>
      p < 0.5 ? Math.pow(p / 16, 1 / 5) : 1 - Math.pow((1 - p) / 16, 1 / 5); // Note: easeInOutQuint had factor 16

    // --- 사인 함수 역함수 ---
    const inverseEaseInSine: EasingFunction = (p) => (2 / Math.PI) * Math.asin(Math.sqrt(p)); // Note: Re-derivation -> p = 1 - cos(x) -> cos(x)=1-p -> x = acos(1-p). t = x / (PI/2). t = (2/PI)acos(1-p). Let's use simpler p = sin^2(t*PI/2)? No, original is easier.
    // Let's re-derive inverseEaseInSine: p = 1 - cos(t*PI/2). cos(t*PI/2) = 1-p. t*PI/2 = acos(1-p). t = (2/PI)*acos(1-p).
    const inverseEaseInSineDerived: EasingFunction = (p) => (2 / Math.PI) * Math.acos(1-p);
    const inverseEaseOutSine: EasingFunction = (p) => (2 / Math.PI) * Math.asin(p);
    const inverseEaseInOutSine: EasingFunction = (p) => (1 / Math.PI) * Math.acos(1 - 2 * p);

    // --- 지수 함수 역함수 ---
    const inverseEaseInExpo: EasingFunction = (p) => p === 0 ? 0 : (Math.log2(p) + 10) / 10;
    const inverseEaseOutExpo: EasingFunction = (p) => p === 1 ? 1 : -Math.log2(1 - p) / 10;
    const inverseEaseInOutExpo: EasingFunction = (p) =>
        p === 0
            ? 0
            : p === 1
            ? 1
            : p < 0.5
            ? (Math.log2(2 * p) + 10) / 20
            : (10 - Math.log2(2 - 2 * p)) / 20;

    // --- 원 함수 역함수 ---
    const inverseEaseInCirc: EasingFunction = (p) => Math.sqrt(1 - Math.pow(1 - p, 2));
    const inverseEaseOutCirc: EasingFunction = (p) => 1 - Math.sqrt(1 - p * p);
    const inverseEaseInOutCirc: EasingFunction = (p) => {
        // Avoid NaN from sqrt for values slightly outside [0, 1] due to precision
        const inner = 1 - Math.pow(1 - 2 * p, 2);
        const val = Math.sqrt(Math.max(0, inner)); // Clamp inner to >= 0
        return p < 0.5 ? val / 2 : 1 - val / 2;
    };


    // --- Bounce 역함수 ---
    // inverseEaseOutBounce는 다른 Bounce 역함수에서 사용
    const inverseEaseOutBounce: EasingFunction = (p) => {
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
        } else if (p < boundary2) {
            // p = n1 * (t - 1.5/d1)^2 + 0.75
            return Math.sqrt((p - boundary1) / n1) + 1.5 / d1;
        } else if (p < boundary3) {
            // p = n1 * (t - 2.25/d1)^2 + 0.9375
            return Math.sqrt((p - boundary2) / n1) + 2.25 / d1;
        } else {
            // p = n1 * (t - 2.625/d1)^2 + 0.984375
            return Math.sqrt((p - boundary3) / n1) + 2.625 / d1;
        }
    };

    const inverseEaseInBounce: EasingFunction = (p) => {
        return 1 - inverseEaseOutBounce(1 - p);
    };

    const inverseEaseInOutBounce: EasingFunction = (p) => {
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
    export enum Easing {
        Linear,
        EaseInQuad, EaseOutQuad, EaseInOutQuad,
        EaseInCubic, EaseOutCubic, EaseInOutCubic,
        EaseInQuart, EaseOutQuart, EaseInOutQuart,
        EaseInQuint, EaseOutQuint, EaseInOutQuint,
        EaseInSine, EaseOutSine, EaseInOutSine,
        EaseInExpo, EaseOutExpo, EaseInOutExpo,
        EaseInCirc, EaseOutCirc, EaseInOutCirc,
        EaseInBack, EaseOutBack, EaseInOutBack, // 역함수 구현 안됨
        EaseInElastic, EaseOutElastic, EaseInOutElastic, // 역함수 구현 안됨
        EaseInBounce, EaseOutBounce, EaseInOutBounce,
    }

    // ---------------------------------------------------------------------------
    // Mapping from Enum to Function (앞선 답변 내용과 동일)
    // ---------------------------------------------------------------------------
    /** Enum 값과 원본 Easing 함수 구현을 매핑하는 객체 */
    export const easingFunctionMap: Record<Easing, EasingFunction> = {
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
    export const inverseEasingFunctionMap: Record<Easing, EasingFunction | null> = {
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
    export function getEasingFunction(easingType: Easing): EasingFunction {
        const func = easingFunctionMap[easingType];
        if (!func) {
            console.warn(`Easing function for type ${Easing[easingType]} (${easingType}) not found in map. Falling back to linear.`);
            return easingFunctionMap[Easing.Linear];
        }
        return func;
    }

    /**
     * Easing Enum 값에 해당하는 역 Easing 함수를 반환합니다.
     * @param easingType - 원하는 Easing 타입 (Easing 열거형 값)
     * @returns 해당 역 Easing 함수. 구현되지 않았거나 찾지 못하면 null 반환.
     */
    export function getInverseEasingFunction(easingType: Easing): EasingFunction | null {
         const func = inverseEasingFunctionMap[easingType];
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
} // End of namespace Ease