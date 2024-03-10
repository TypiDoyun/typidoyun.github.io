const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");
const framePerSecond = 40;
const milisecondPerFrame = 1000 / framePerSecond;
let tauPerSecond = 1;

const main = () => {
    const size = 250;
    const center = new Vector(canvas.width / 2, canvas.height / 2);
    
    const startTime = Date.now();
    let previousTime = startTime;
    let angle = 0;
    
    const interval = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - previousTime;
        previousTime = currentTime;
        const deltaConstant = deltaTime / milisecondPerFrame;
        angle = (angle + 360000 * deltaConstant / framePerSecond / tauPerSecond) % 360000;
        const radian = angle * Math.PI / 180000;
        const radius = size * Math.sqrt(3) / 6 * (3 / 5);

        context.clearRect(0, 0, canvas.width, canvas.height);

        const [ a, b, c ] = drawTriangle(context, center, size);
    
        const abCenter = a.lerp(b, 0.5);
        const bcCenter = b.lerp(c, 0.5);
        const caCenter = c.lerp(a, 0.5);

        const dot = new Vector(
            Math.cos(radian) * radius,
            Math.sin(radian) * radius
        ).add(center);

        drawDot(context, dot, 2);
        // drawLine(context, dot, abCenter);
        // drawLine(context, dot, bcCenter);
        // drawLine(context, dot, caCenter);
        
        let abLine = center.fromOrigin(abCenter);
        let bcLine = center.fromOrigin(bcCenter);
        let caLine = center.fromOrigin(caCenter);

        abLine.length = abLine.dot(dot.fromOrigin(abCenter)) / abLine.length;
        bcLine.length = bcLine.dot(dot.fromOrigin(bcCenter)) / bcLine.length;
        caLine.length = caLine.dot(dot.fromOrigin(caCenter)) / caLine.length;

        drawLine(context, abCenter, abLine.add(abCenter), "#F00");
        drawLine(context, bcCenter, bcLine.add(bcCenter), "#0F0");
        drawLine(context, caCenter, caLine.add(caCenter), "#00F");
        drawLine(context, dot, abLine.add(abCenter), "#F88");
        drawLine(context, dot, bcLine.add(bcCenter), "#8F8");
        drawLine(context, dot, caLine.add(caCenter), "#88F");

        const maxLength = size * Math.sqrt(3) / 2;
        const bar = new Vector(canvas.width * 3 / 4, center.y + size * Math.sqrt(3) / 6);
        
        const abBar = new Vector(bar.x, bar.y - abLine.length);
        const bcBar = new Vector(bar.x, abBar.y - bcLine.length);
        const caBar = new Vector(bar.x, bcBar.y - caLine.length);
        drawLine(context, bar, abBar, "#F00");
        drawLine(context, abBar, bcBar, "#0F0");
        drawLine(context, bcBar, caBar, "#00F");
        drawDot(context, bar, 2);
        drawDot(context, caBar, 2);

        // console.log(`deltaTime: ${String(deltaTime).padEnd(2, " ")}, deltaConstant: ${String(deltaConstant).padEnd(4, " ")}, angle: ${String(angle / 1000).padStart(3, " ")}`);
    }, milisecondPerFrame);
}

addEventListener("keydown", eventData => {
    const { key } = eventData;

    if (key !== " ") return;
    
    tauPerSecond = 5;
});

addEventListener("keyup", eventData => {
    const { key } = eventData;
    
    if (key !== " ") return;

    tauPerSecond = 1;
});