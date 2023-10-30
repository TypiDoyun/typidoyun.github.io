const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

if (!context) throw new Error("connot find context");

const lightVector = new Vector(
    -2,
    -4,
    -1,
    0,
    0,
    0
).normalized;

const vertices: Vector[] = [ ];

const toRadians = (angle: number) => angle * Math.PI / 180;

const initialize = (dotStep: number) => {
    for (let _phi = 0; _phi < 360; _phi += dotStep) {
        const phi = toRadians(_phi);
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        
        for (let _theta = 0; _theta < 180; _theta += dotStep) {
            const theta = toRadians(_theta);
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
            const vertex = new Vector(
                cosTheta * sinPhi,
                sinTheta * sinPhi,
                cosPhi,
                toRadians(Math.random() * 100),
                toRadians(Math.random() * 100),
                Math.floor(Math.random() * (80 - 0 + 1)) + 0
            );

            if (vertices.some(vertexElement => vertexElement.equals(vertex))) continue;

            vertices.push(vertex);
        }
    }
}

const render = (radius: number, dotSize: number, FPS: number, zDistance: number, color: [ number, number, number ], rotateStep: Vector = new Vector(0, 0, 0, 0, 0, 0)) => {
    const rotate = new Vector(0, 0, 0, 0, 0, 0);
    let _randomRateRadians = 0;
    const _render = async () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const randomRate = Math.sin(_randomRateRadians) / 2 + 0.5;
        _randomRateRadians += 0.01;
        
        for (const vertex of vertices) {
            const rotated = vertex.multiRotated(
                [ Axis.X, Axis.Y, Axis.Z ],
                [ rotate.x, rotate.y, rotate.z ],
                [ vertex.yaw, vertex.pitch, 0 ],
                randomRate
            );

            rotated.multiply(1 - (vertex.quantization / 110) * randomRate);

            
            const lightPower = rotated.normalized.cosSimilarity(lightVector);
            context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${(lightPower + 1) / 2})`;
            
            rotated.x *= radius;
            rotated.y *= radius;
            rotated.z *= radius;
            
            const size = rotated.z + zDistance;
            
            context.fillRect(canvas.width / 2 + rotated.x, canvas.height / 2 + rotated.y, dotSize / size * radius, dotSize / size * radius);
        }

        rotate.x += (rotateStep.x) / FPS * randomRate;
        rotate.y += (rotateStep.y) / FPS * randomRate;
        rotate.z += (rotateStep.z) / FPS * randomRate;

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                _render();
                resolve(true);
            }, 1000 / FPS)
        });
    }

    _render();
}

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}