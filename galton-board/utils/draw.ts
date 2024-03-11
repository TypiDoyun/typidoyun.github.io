const useLog = false;

const drawDot = (context: CanvasRenderingContext2D, vector: Vector, radius: number = 1, style: string | CanvasGradient | CanvasPattern = "#FFF"): Vector => {
    if (useLog) console.log(`drawing dot: ${vector}`);

    context.fillStyle = style;

    context.beginPath();
    context.arc(vector.x, vector.y, radius, 0, 360);
    context.fill();

    return vector;
}

const drawLine = (context: CanvasRenderingContext2D, from: Vector, to: Vector, style: string | CanvasGradient | CanvasPattern = "#FFF"): [ Vector, Vector ] => {
    if (useLog) console.log(`drawing line: ${from} to ${to}`);

    context.strokeStyle = style;

    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();

    return [ from, to ];
}

const drawTree = (context: CanvasRenderingContext2D, tree: Tree): Tree => {
    for (const node of tree) {
        drawDot(context, node.getVector(), 2);
    }

    return tree;
}

const drawGuideLine = (context: CanvasRenderingContext2D, width: number, height: number) => {
    for (let x = 0; x <= width; x++) {
        const graphX = (x - width / 2) * (16 / width);
        const y = Math.pow(Math.E, -(graphX ** 2) / 2) / (2 * Math.PI) * 1800;

        const vector = new Vector(x, height - y);

        drawDot(context, vector);
    }
}