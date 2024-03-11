const useLog = false;
const drawDot = (context, vector, radius = 1, style = "#FFF") => {
    if (useLog)
        console.log(`drawing dot: ${vector}`);
    context.fillStyle = style;
    context.beginPath();
    context.arc(vector.x, vector.y, radius, 0, 360);
    context.fill();
    return vector;
};
const drawLine = (context, from, to, style = "#FFF") => {
    if (useLog)
        console.log(`drawing line: ${from} to ${to}`);
    context.strokeStyle = style;
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
    return [from, to];
};
const drawTree = (context, tree) => {
    for (const node of tree) {
        drawDot(context, node.getVector(), 2);
    }
    return tree;
};
const drawGuideLine = (context, width, height) => {
    for (let x = 0; x <= width; x++) {
        const graphX = (x - width / 2) * (18 / width);
        const y = Math.pow(Math.E, -(graphX ** 2) / 2) / (2 * Math.PI) * 1800;
        const vector = new Vector(x, height - y);
        drawDot(context, vector);
    }
};
