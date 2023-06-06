"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
if (!context)
    throw new Error("connot find context");
const lightVector = new Vector(-2, -4, -1).normalized;
const vertices = [];
const toRadians = (angle) => angle * Math.PI / 180;
const initialize = (dotStep) => {
    for (let _phi = 0; _phi < 360; _phi += dotStep) {
        const phi = toRadians(_phi);
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        for (let _theta = 0; _theta < 180; _theta += dotStep) {
            const theta = toRadians(_theta);
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
            const vertex = new Vector(cosTheta * sinPhi, sinTheta * sinPhi, cosPhi);
            if (vertices.some(vertexElement => vertexElement.equals(vertex)))
                continue;
            vertices.push(vertex);
        }
    }
};
const render = (radius, dotSize, FPS, zDistance, color, rotateStep = new Vector(0, 0, 0)) => {
    const rotate = new Vector(0, 0, 0);
    const _render = () => __awaiter(void 0, void 0, void 0, function* () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (const vertex of vertices) {
            const rotated = vertex.multiRotated([Axis.X, Axis.Y, Axis.Z], [rotate.x, rotate.y, rotate.z]);
            const lightPower = rotated.normalized.cosSimilarity(lightVector);
            context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${(lightPower + 1) / 2})`;
            rotated.x *= radius;
            rotated.y *= radius;
            rotated.z *= radius;
            const size = rotated.z + zDistance;
            context.fillRect(canvas.width / 2 + rotated.x, canvas.height / 2 + rotated.y, dotSize / size * radius, dotSize / size * radius);
        }
        rotate.x += (rotateStep.x) / FPS;
        rotate.y += (rotateStep.y) / FPS;
        rotate.z += (rotateStep.z) / FPS;
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                _render();
                resolve(true);
            }, 1000 / FPS);
        });
    });
    _render();
};
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
