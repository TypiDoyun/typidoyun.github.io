const ballSize = 1.5;
const framePerSecond = 40;
const milisecondPerFrame = 1000 / framePerSecond;
const balls = new Set();
const startTime = Date.now();
let previousTime = startTime;
let angle = 0;
const progressMap = new WeakMap();
const start = (tree) => {
    setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - previousTime;
        previousTime = currentTime;
        const deltaConstant = deltaTime / milisecondPerFrame;
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawTree(context, tree);
        drawGuideLine(context, canvas.width, canvas.height);
        for (const ball of balls) {
            const currentAnimation = ball.getAnimations()[0];
            if (!currentAnimation) {
                drawDot(context, ball.vector, ballSize, "#0F0");
                continue;
            }
            const progress = progressMap.get(currentAnimation) ?? 0;
            const currentProgress = Math.min(100, progress + 100 / framePerSecond / currentAnimation.time * deltaConstant);
            const x = new Vector(currentAnimation.xRange[0], 0).lerp(new Vector(currentAnimation.xRange[1], 0), currentProgress / 100).x;
            const vector = currentAnimation.update(x);
            ball.vector.x = vector.x;
            ball.vector.y = vector.y;
            progressMap.set(currentAnimation, currentProgress);
            if (currentProgress === 100) {
                ball.getAnimations().pop();
                currentAnimation.onEnd();
            }
            drawDot(context, ball.vector, ballSize, "#BBF");
        }
    }, milisecondPerFrame);
};
class Ball {
    vector;
    animations = [];
    constructor(vector) {
        this.vector = vector;
        balls.add(this);
    }
    getAnimations() {
        return this.animations;
    }
    addAnimation(animationOption) {
        this.animations.push(animationOption);
    }
}
