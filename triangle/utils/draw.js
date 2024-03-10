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
const drawTriangle = (context, center, size) => {
    let a = new Vector(0, 0).add(center);
    let b = new Vector(size, 0).add(center);
    let c = new Vector(size / 2, -size * Math.sqrt(3) / 2).add(center);
    let triangleCenter = new Vector((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);
    a = a.add(center).sub(triangleCenter);
    b = b.add(center).sub(triangleCenter);
    c = c.add(center).sub(triangleCenter);
    triangleCenter = null;
    drawDot(context, center);
    drawLine(context, a, b);
    drawLine(context, b, c);
    drawLine(context, c, a);
    return [a, b, c];
};
