const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;
const gap = 8;

const factorial = (n: number) => {
    if (n === 1) return 1;
    else return n * factorial(n - 1);
}

const main = async () => {
    const tree = makeTree(35);

    start(tree);

    for (let i = 0; i < 2200; i++) {
        await new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                dropBall(tree);
                resolve();
            }, Math.random() * 5);
        })
    }

    console.log(factorial(3));
}

const makeTree = (height: number) => {
    const tree = new Tree(new TreeNode(new Vector(canvas.width / 2, 50), "Root"));

    for (let y = 2; y <= height; y++) {
        for (let x = 1; x <= y; x++) {
            const currentN = (y - 1) * y / 2 + x;
            const current = tree.getNthChild(currentN);
            const parentN = [
                (y - 2) * (y - 1) / 2 + x,
                (y - 2) * (y - 1) / 2 + x - 1
            ];
            const parents = [ tree.getNthChild(parentN[0]), tree.getNthChild(parentN[1]) ];
            const min = (y - 2) * (y - 1) / 2 + 1;
            const max = (y - 1) * y / 2;
            if (parentN[0] < min || parentN[0] > max) parents[0] = undefined;
            if (parentN[1] < min || parentN[1] > max) parents[1] = undefined;

            if (current) continue;
            if (!parents[0] && !parents[1]) continue;
            
            const parentVector = parents[0]?.getVector() ?? parents[1]?.getVector();
            const vector = new Vector(
                parentVector.x - (x === y ? -gap : gap),
                parentVector.y + gap * 1.75
            )
            const node = new TreeNode(vector, `Child ${currentN}`);

            for (const parent of parents) {
                if (!parent) continue;
                parent.appendChild(node);
            }
        }
    }


    return tree;
}

let heightMap = new Map<string, number>();

const dropBall = (tree: Tree) => {
    const root = tree.getRoot();
    const ball = new Ball(root.getVector().clone);

    let currentNode = root;


    const onEnd = () => {
        const random = Math.round(Math.random());

        if (!currentNode) return;

        let targetNode = currentNode.getChild(random);

        const xRange = [
            currentNode.getVector().x,
            targetNode?.getVector()?.x ?? (random === 1 ? gap : -gap) + currentNode.getVector().x
        ] as [ number, number ];

        const toX = xRange[1].toFixed(0);

        ball.addAnimation({
            xRange,
            time: 0.2,
            update(x) {
                const p = currentNode.getVector();
                const q = targetNode?.getVector() ?? (new Vector(xRange[1], canvas.height + (heightMap.get(toX) ?? 0)));
                const h = p.y - 5;

                const findRoot = (a: number, b: number, c: number) => {
                    const results = [
                        (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a),
                        (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a)
                    ]
                    
                    return results.find(value => Math.min(...xRange) <= value && Math.max(...xRange) >= value)!;
                }
                
                const b = findRoot(
                    p.y - q.y,
                    -2 * (q.x * (p.y - h) - p.x * (q.y - h)),
                    (p.y - h) * (q.x ** 2) - (q.y - h) * (p.x ** 2)
                )
                const a = (p.y - h) / ((p.x ** 2) - (2 * p.x * b) + (b ** 2));
                const y = a * (x - b) ** 2 + h;
                const result = new Vector(x, y);

                return result;
            },
            onEnd: () => {
                if (!targetNode) return heightMap.set(toX, (heightMap.get(toX) ?? 0) - 1);
                currentNode = targetNode;
                
                onEnd();
            }
        })
    }

    ball.addAnimation({
        xRange: [0, 1],
        time: 0.2,
        update(x) {
            return new Vector(canvas.width / 2, (x ** 2) * root.getVector().y);
        },
        onEnd
    })
}

const h = 3;

const p = {
    x: 0,
    y: 2
};
const q = {
    x: 2,
    y: 0
};

const findRoot = (a: number, b: number, c: number) => {
    return (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
}



const a = p.y - q.y;
const b = -2 * (q.x * (p.y - h) - p.x * (q.y - h));
const c2 = (p.y - h) * (q.x ** 2) - (q.y - h) * (p.x ** 2);

console.log(findRoot(a, b, c2), Math.sqrt(3) - 1);