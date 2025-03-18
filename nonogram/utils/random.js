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
        let x = Math.sin(seed) * 10000;
        return () => {
            x = Math.sin(x) * 10000;
            return x - Math.floor(x);
        };
    };
})(Random || (Random = {}));
