export namespace Random {
    export const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    export const randBool = () => Math.random() >= 0.5;
    export const randFloat = (min: number, max: number) => Math.random() * (max - min) + min;
    export const shuffle = <T>(array: T[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = randInt(0, i);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    export const choice = <T>(array: T[]) => array[randInt(0, array.length - 1)];
    export const sample = <T>(array: T[], n: number) => {
        const shuffled = array.slice();
        shuffle(shuffled);
        return shuffled.slice(0, n);
    }
    export const pseudoRandom = (seed: number) => {
        const a = 1664525;
        const c = 1013904223;
        const m = 4294967296;
      
        return () => {
            seed = (a * seed + c) % m;
            return seed / m;
        };
    }
}