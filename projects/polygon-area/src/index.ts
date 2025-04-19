import { Vec2 } from "vecs-ts";
import { Canvas } from "./namespaces/canvas";
import { Ease } from "./namespaces/ease";

const pixelPerUnit = 50;

const drawAxis = (canvas: HTMLCanvasElement) => {
    Canvas.drawRectangle(canvas, {
        from: Vec2.zero,
        to: new Vec2(canvas.width, canvas.height),
        fillColor: "#000000",
        duration: 0,
    });
    const duration = 1000;
    const easing = Ease.Easing.EaseInOutExpo;
    const inverseEasingFunction = Ease.inverseEasingFunctionMap[easing];

    if (inverseEasingFunction === null) {
        throw new Error(`Easing function ${easing} not found`);
    }

    for (let i = pixelPerUnit; i < canvas.width / 2; i += pixelPerUnit) {
        const n = i / pixelPerUnit;
        const positive = canvas.width / 2 + i;
        const negative = canvas.width / 2 - i;
        let lineWidth: number;
        let color: string;
        if (n % 2 === 0) {
            lineWidth = 1;
            color = "#58C4DD";
        }
        else {
            lineWidth = 0.5;
            color = "#C7E9F1";
        }
        const x = i / (canvas.width / 2);
        const waitingTime = inverseEasingFunction(x) * duration;
        // setTimeout(() => {
        Canvas.drawLine(canvas, {
            from: new Vec2(positive, canvas.height / 2),
            to: new Vec2(positive, 0),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(positive, canvas.height / 2),
            to: new Vec2(positive, canvas.height),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(negative, canvas.height / 2),
            to: new Vec2(negative, 0),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(negative, canvas.height / 2),
            to: new Vec2(negative, canvas.height),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
    }
    console.log(canvas.height / 2);
    for (let i = pixelPerUnit; i < canvas.height / 2; i += pixelPerUnit) {
        const n = i / pixelPerUnit;
        console.log(n, i);
        const positive = canvas.height / 2 + i;
        const negative = canvas.height / 2 - i;
        let lineWidth: number;
        let color: string;

        if (n % 2 === 0) {
            lineWidth = 1;
            color = "#58C4DD";
        }
        else {
            lineWidth = 0.5;
            color = "#C7E9F1";
        }

        const x = i / (canvas.height / 2);
        const waitingTime = inverseEasingFunction(x) * duration;
        console.log(waitingTime, x, duration);  
        Canvas.drawLine(canvas, {
            from: new Vec2(canvas.width / 2, positive),
            to: new Vec2(0, positive),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(canvas.width / 2, positive),
            to: new Vec2(canvas.width, positive),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(canvas.width / 2, negative),
            to: new Vec2(0, negative),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });
        Canvas.drawLine(canvas, {
            from: new Vec2(canvas.width / 2, negative),
            to: new Vec2(canvas.width, negative),
            lineWidth,
            color,
            duration,
            delay: waitingTime,
            easing
        });

    }

    Canvas.drawLine(canvas, {
        from: new Vec2(canvas.width / 2, canvas.height / 2),
        to: new Vec2(canvas.width, canvas.height / 2),
        lineWidth: 2,
        color: "white",
        duration,
        easing
    });
    Canvas.drawLine(canvas, {
        from: new Vec2(canvas.width / 2, canvas.height / 2),
        to: new Vec2(0, canvas.height / 2),
        lineWidth: 2,
        color: "white",
        duration,
        easing
    });
    Canvas.drawLine(canvas, {
        from: new Vec2(canvas.width / 2, canvas.height / 2),
        to: new Vec2(canvas.width / 2, canvas.height),
        lineWidth: 2,
        color: "white",
        duration,
        easing
    });
    Canvas.drawLine(canvas, {
        from: new Vec2(canvas.width / 2, canvas.height / 2),
        to: new Vec2(canvas.width / 2, 0),
        lineWidth: 2,
        color: "white",
        duration,
        easing
    });
}

const points: Vec2[] = [];
const pointIds: number[] = [];
const lineIds: number[] = [];

const drawPoint = (canvas: HTMLCanvasElement, x: number, y: number) => {
    const before = points[points.length - 1];
    const point = new Vec2(x / canvas.width, (canvas.height - y) / canvas.height);
    if (before) {
        const distance = point.distance(before);
        if (distance < 0.0001) {
            return;
        }
    }

    points.push(point);
    pointIds.push(Canvas.drawCircleSync(canvas, {
        center: point.clone.mul(new Vec2(canvas.width, canvas.height)),
        radius: points.length == 1 ? 8 : 5,
        fillColor: "#FFFFFF",
        duration: 500,
        easing: Ease.Easing.EaseInOutSine
    }));

    if (points.length > 3) {
        Canvas.disappear(lineIds.pop()!, {
            duration: 250
        });
    }
    if (points.length > 1) {
        const id = Canvas.drawLineSync(canvas, {
            from: points[points.length - 2].clone.mul(new Vec2(canvas.width, canvas.height)),
            to: points[points.length - 1].clone.mul(new Vec2(canvas.width, canvas.height)),
            lineWidth: 2,
            color: "#FFFFFF",
            duration: 250,
            easing: Ease.Easing.EaseInOutSine
        });
        lineIds.push(id);
    }
    if (points.length > 2) {
        const id = Canvas.drawLineSync(canvas, {
            from: points[0].clone.mul(new Vec2(canvas.width, canvas.height)),
            to: points[points.length - 1].clone.mul(new Vec2(canvas.width, canvas.height)),
            lineWidth: 2,
            color: "#FFFFFF",
            duration: 250,
            easing: Ease.Easing.EaseInOutSine
        });
        lineIds.push(id);
    }

}


const main = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        console.error("Failed to get canvas context");
        return;
    }
    
    const resizeCanvas = () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        console.log(window.innerWidth, window.innerHeight);
        console.log(canvas.width, canvas.height);
        
        Canvas.redraw(canvas);
    }

    
    resizeCanvas();
    Canvas.init(canvas);
    // Canvas.drawLine(canvas, {
    //     from: new Vec2(0, 0),
    //     to: new Vec2(canvas.width, canvas.height),
    //     lineWidth: 2,
    //     color: "#FC6255",
    //     duration: 0,
    // })
    drawAxis(canvas);
    window.addEventListener("resize", resizeCanvas);

    canvas.addEventListener("click", eventData => {
        const rect = canvas.getBoundingClientRect();
        const x = eventData.clientX - rect.left;
        const y = eventData.clientY - rect.top;

        drawPoint(canvas, x, canvas.height - y);
        Canvas.redraw(canvas);
    });

    const calculate = () => {
        // 신발끈 공식
        const pl = points.map(p => p.clone.subScalar(0.5).mul(new Vec2(canvas.width, canvas.height)).divScalar(pixelPerUnit).round(12));
        let value = 0;
        for (let i = 0; i < pl.length; i++) {
            if (i !== pl.length) {
                value += pl[i].x * pl[(i + 1) % pl.length].y;
            }
            if (i !== 0) {
                value -= pl[i].x * pl[i - 1].y;
            }
        }
        drawCalculateProcess();
        return Math.abs(value) / 2;
    }
    const wait = async (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const drawCalculateProcess = async () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Failed to get canvas context");
            return;
        }

        ctx.strokeStyle = "#FC6255";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#C9E2AE";
        const o = new Vec2(canvas.width / 2, canvas.height / 2);

        for (let i = 0; i < points.length; i++) {
            if (i == 0) continue;
            const p1 = points[i];
            const p2 = points[(i + 1) % points.length];
            const op1 = p1.clone.mul(new Vec2(canvas.width, canvas.height)).sub(o);
            const op2 = p2.clone.mul(new Vec2(canvas.width, canvas.height)).sub(o);
            let color: string;
            if (Math.sign(op1.cross(op2)) === 1) {
                color = "#9CDCEB";
            }
            else {
                color = "#FC6255";
            }
            
            // 삼각형 p1 p2 o 그리기
            await wait(1000);
        }
        
    }
    const l = 100;
    const offset = new Vec2(200, 200);
    // drawPoint(canvas, canvas.width / 2 + offset.x, canvas.height / 2 + offset.y);
    // drawPoint(canvas, canvas.width / 2 + l + offset.x, canvas.height / 2 + offset.y);
    // drawPoint(canvas, canvas.width / 2 + l + offset.x, canvas.height / 2 + l + offset.y);
    // drawPoint(canvas, canvas.width / 2 + offset.x, canvas.height / 2 + l + offset.y);
    Canvas.redraw(canvas);

    const disappearOptions = {
        duration: 250
    };

    window.addEventListener("keydown", async eventData => {
        if (eventData.key === "Backspace") {
            points.pop();
            const id = pointIds.pop();
            if (id !== undefined) {
                Canvas.disappear(id, disappearOptions);
            }
            const lineId = lineIds.pop();
            if (lineId !== undefined) {
                Canvas.disappear(lineId, disappearOptions);
            }
            if (points.length > 1) {
                const lineId2 = lineIds.pop();
                if (lineId2 !== undefined) {
                    Canvas.disappear(lineId2, disappearOptions);
                }
            }
            if (points.length > 2) {
                const id = Canvas.drawLineSync(canvas, {
                    from: points[points.length - 1].clone.mul(new Vec2(canvas.width, canvas.height)),
                    to: points[0].clone.mul(new Vec2(canvas.width, canvas.height)),
                    lineWidth: 2,
                    color: "#FFFFFF",
                    duration: 250,
                    easing: Ease.Easing.EaseInOutSine
                });
                lineIds.push(id);
            }
            Canvas.redraw(canvas);
        }
        else if (eventData.key === "c") {
            for (let i = 0; i < points.length; i++) {
                const id = pointIds[i];
                if (id !== undefined) {
                    Canvas.disappear(id, disappearOptions);
                }
            }
            points.length = 0;
            pointIds.length = 0;
            for (let i = 0; i < lineIds.length; i++) {
                const id = lineIds[i];
                if (id !== undefined) {
                    Canvas.disappear(id, disappearOptions);
                }
            }
            lineIds.length = 0;
            Canvas.redraw(canvas);
        }
        else if (eventData.key === "Enter") {
            console.log("start calculating")
            console.log(calculate())

            // Canvas.drawCircle(canvas, {
            //     center: new Vec2(canvas.width / 2, canvas.height / 2),
            //     radius: 100,
            //     strokeWidth: 2,
            //     strokeColor: "#FC6255",
            //     fillColor: "#C9E2AE",
            //     duration: 1000,
            //     easing: Ease.Easing.EaseInOutSine
            // })
        }
    });
}

window.addEventListener("DOMContentLoaded", main);