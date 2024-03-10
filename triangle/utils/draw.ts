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

const drawTriangle = (context: CanvasRenderingContext2D, center: Vector, size: number): [ Vector, Vector, Vector ] => {
    let a = new Vector(0, 0).add(center);
    let b = new Vector(size, 0).add(center);
    let c = new Vector(size / 2, -size * Math.sqrt(3) / 2).add(center);
    let triangleCenter = new Vector(
        (a.x + b.x + c.x) / 3,
        (a.y + b.y + c.y) / 3
    )

    a = a.add(center).sub(triangleCenter);
    b = b.add(center).sub(triangleCenter);
    c = c.add(center).sub(triangleCenter);

    triangleCenter = null;

    drawDot(context, center);
    
    drawLine(context, a, b);
    drawLine(context, b, c);
    drawLine(context, c, a);

    return [ a, b, c ];
}