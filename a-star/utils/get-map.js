const getMap = () => {
    const elementMap = document.getElementById("map");
    const blocks = document.getElementsByClassName("block");
    const computedStyle = getComputedStyle(elementMap);
    const width = +computedStyle.getPropertyValue("--width");
    const height = +computedStyle.getPropertyValue("--height");
    if (width * height !== blocks.length)
        throw new Error("배열의 길이가 올바르지 않습니다.");
    const map = new Array(height).fill(undefined).map(_ => new Array(width).fill(0));
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = y * width + x;
            const block = blocks[index];
            const status = getStatus(block);
            map[y][x] = status;
            ;
        }
    }
    return map;
};
