const isValidPath = (path: Path, width: number, height: number) => {
    const map = getMap();
    return path.x >= 0 && path.x < width && path.y >= 0 && path.y < height && map[path.y][path.x] !== Status.Wall;
}

const glass = document.getElementById("glass")!;


const backgroundAnimation = [
    { opacity: "0", display: "inline-block" },
    { opacity: "0.2" },
    { opacity: "0", display: "none" }
]
const animation = [
    { transform: "translate(0, 0) rotate(0deg)" },
    { transform: "translate(5px, 5px) rotate(2deg)" },
    { transform: "translate(0, 0) rotate(0eg)" },
    { transform: "translate(-5px, 5px) rotate(-2deg)" },
    { transform: "translate(0, 0) rotate(0deg)" },
    { transform: "translate(5px, 5px) rotate(2deg)" },
    { transform: "translate(0, 0) rotate(0eg)" },
    { transform: "translate(-5px, 5px) rotate(-2deg)" },
    { transform: "translate(0, 0) rotate(0deg)" }
]

const aStar = (map: Status[][]) => {
    const elementMap = document.getElementById("map") as HTMLDivElement;
    const blocks = document.getElementsByClassName("block") as HTMLCollectionOf<HTMLDivElement>;

    const computedStyle = getComputedStyle(elementMap);
    const width = +computedStyle.getPropertyValue("--width");
    const height = +computedStyle.getPropertyValue("--height");
    let start: Path;
    let end: Path;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            const status = map[y][x];

            if (status == Status.Start) start = new Path(x, y);
            else if (status == Status.End) end = new Path(x, y);
        }
    }

    if (!start! || !end!) {
        elementMap.animate(animation, {
            duration: 200,
            easing: "ease"
        });
        glass.animate(backgroundAnimation, {
            duration: 500,
            easing: "ease"
        })
        throw new Error("시작 지점 또는 끝 지점이 설정되지 않았습니다.");
    }

    const openPathes = [start];
    const closedPathes: Path[] = [];

    let result: Path | undefined;

    while (openPathes.length > 0) {
        openPathes.sort((a, b) => a.getF(end) - b.getF(end));
        
        const selectedPath = openPathes[0];
        if (selectedPath.equals(end)) {
            console.log("도착");
            result = selectedPath;
            break;
        }
        closedPathes.push(selectedPath);
        openPathes.shift();

        const { x, y } = selectedPath;

        const pathList = [
            new Path(x + 1, y, selectedPath, selectedPath.g + 1),
            new Path(x, y + 1, selectedPath, selectedPath.g + 1),
            new Path(x - 1, y, selectedPath, selectedPath.g + 1),
            new Path(x, y - 1, selectedPath, selectedPath.g + 1)
        ].filter(path => isValidPath(path, width, height) && closedPathes.every(_path => !_path.equals(path)) && openPathes.every(_path => !_path.equals(path)));
        openPathes.push(...pathList);
    }

    if (result === undefined) {
        elementMap.animate(animation, {
            duration: 200,
            easing: "ease"
        });
        glass.animate(backgroundAnimation, {
            duration: 500,
            easing: "ease"
        })
        return;
    }

    const print = (result: Path) => {
        if (result.parent !== undefined) print(result.parent);
        const attr = +blocks[result.y * width + result.x].getAttribute("data-status")!;
        if (attr === 2 || attr === 3) return;
        blocks[result.y * width + result.x].setAttribute("data-status", "7");
    }

    print(result);
}

