"use strict";
console.time("prime");
const primes = getPrimes(500000);
console.timeEnd("prime");
const dotSize = 0.75;
let zoom = 2;
const zoomSlider = document.getElementById("zoom-slider");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const pathList = [];
const drawDot = (x, y, radius, color = "white") => {
    const path = new Path2D();
    path.arc(x, y, radius, 0, Math.PI * 2);
    // context.save();
    if (color !== undefined)
        context.fillStyle = color;
    context.fill(path);
    pathList.push(path);
};
const clear = () => {
    pathList.splice(0, pathList.length);
    context.clearRect(0, 0, canvas.width, canvas.height);
};
const getCenter = () => {
    return {
        x: canvas.width / 2,
        y: canvas.height / 2
    };
};
const render = () => {
    clear();
    for (const prime of primes) {
        const center = getCenter();
        drawDot(center.x + zoom * prime * Math.cos(prime), center.y + zoom * prime * Math.sin(prime), dotSize + (1.25 * (+zoomSlider.value - 22) / 19978), undefined);
    }
};
for (const prime of primes) {
    const center = getCenter();
    drawDot(center.x + zoom * prime * Math.cos(prime), center.y + zoom * prime * Math.sin(prime), dotSize + (1.25 * (+zoomSlider.value - 22) / 19978));
}
canvas.addEventListener("mousemove", (eventData) => {
    clear();
    const path = pathList.find(path => context.isPointInPath(path, eventData.offsetX, eventData.offsetY));
    if (path)
        context.fillStyle = "red";
    else
        context.fillStyle = "blue";
    render();
});
zoomSlider.addEventListener("input", () => {
    zoom = +zoomSlider.value / 10000;
    render();
});
