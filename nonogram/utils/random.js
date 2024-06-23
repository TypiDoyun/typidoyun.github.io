export var Random;
(function (Random) {
    Random.randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    Random.randBool = () => Math.random() >= 0.5;
    Random.randFloat = (min, max) => Math.random() * (max - min) + min;
    Random.shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Random.randInt(0, i);
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    Random.choice = (array) => array[Random.randInt(0, array.length - 1)];
    Random.sample = (array, n) => {
        const shuffled = array.slice();
        Random.shuffle(shuffled);
        return shuffled.slice(0, n);
    };
    Random.pseudoRandom = (seed) => {
        const a = 1664525;
        const c = 1013904223;
        const m = 4294967296;
        return () => {
            seed = (a * seed + c) % m;
            return seed / m;
        };
    };
})(Random || (Random = {}));
