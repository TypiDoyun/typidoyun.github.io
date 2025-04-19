import { Vec2, Vec2Like } from "vecs-ts"
import { Ease } from "./ease";
export enum CanvasObjectType {
    Line,
    Circle,
    Rectangle,
}
export type EasingFunction = (t: number) => number;
export namespace Canvas {
    type CompletedCanvasObject = {
        type: CanvasObjectType.Line;
        from: Vec2Like;
        to: Vec2Like;
        lineWidth: number;
        color: string;
    } | {
        type: CanvasObjectType.Circle;
        center: Vec2Like;
        radius: number;
        strokeWidth?: number;
        strokeColor?: string;
        fillColor?: string;
    } | {
        type: CanvasObjectType.Rectangle;
        from: Vec2Like;
        to: Vec2Like;
        strokeWidth?: number;
        strokeColor?: string;
        fillColor?: string;
    }
    type AnimatingCanvasObject = {
        type: CanvasObjectType.Line;
        startedTime: number;
        duration: number;
        delay?: number;
        disappearing: boolean;
        easing: Ease.Easing;
        from: Vec2Like;
        to: Vec2Like;
        lineWidth: number;
        color: string;
        resolve: (id: number) => void;
    } | {
        type: CanvasObjectType.Circle;
        startedTime: number;
        duration: number;
        delay?: number;
        disappearing: boolean;
        easing: Ease.Easing;
        center: Vec2Like;
        radius: number;
        strokeWidth?: number;
        strokeColor?: string;
        fillColor?: string;
        resolve: (id: number) => void;
    } | {
        type: CanvasObjectType.Rectangle;
        startedTime: number;
        duration: number;
        delay?: number;
        disappearing: boolean;
        easing: Ease.Easing;
        from: Vec2Like;
        to: Vec2Like;
        strokeWidth?: number;
        strokeColor?: string;
        fillColor?: string;
        resolve: (id: number) => void;
    }
    const animatingCanvasObjects: Map<number, AnimatingCanvasObject> = new Map();
    const completedCanvasObjects: Map<number, CompletedCanvasObject> = new Map();

    let _id = 0;
    const createId = () => {
        _id++;
        return _id;
    }

    const getCtx = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Canvas context not found");
        }
        return ctx;
    }

    export const redraw = (canvas: HTMLCanvasElement) => {
        const ctx = getCtx(canvas);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const completed = Array.from(completedCanvasObjects.entries());
        completed.sort((a, b) => {
            return a[0] - b[0];
        });
        for (const [_, completedCanvasObject] of completed) {
            const { type } = completedCanvasObject;
            if (type === CanvasObjectType.Line) {
                const { from: f, to: t, lineWidth, color } = completedCanvasObject;
                const from = Vec2.from(f).mul({ x: canvas.width, y: canvas.height });
                const to = Vec2.from(t).mul({ x: canvas.width, y: canvas.height });
                ctx.beginPath();
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = color;
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
                ctx.closePath();
            }
            else if (type === CanvasObjectType.Circle) {
                const { center: c, radius, strokeWidth, strokeColor, fillColor } = completedCanvasObject;
                const center = Vec2.from(c).mul({ x: canvas.width, y: canvas.height });
                ctx.beginPath();
                ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
                if (strokeWidth) {
                    ctx.lineWidth = strokeWidth;
                    ctx.strokeStyle = strokeColor ?? "#ffffff";
                    ctx.stroke();
                }
                if (fillColor) {
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                }
                ctx.closePath();
            }
            else if (type === CanvasObjectType.Rectangle) {
                const { from: f, to: t, strokeWidth, strokeColor, fillColor } = completedCanvasObject;
                ctx.beginPath();
                const from = Vec2.from(f).mul({ x: canvas.width, y: canvas.height });
                const to = Vec2.from(t).mul({ x: canvas.width, y: canvas.height });
                ctx.rect(from.x, from.y, to.x - from.x, to.y - from.y);
                if (strokeWidth) {
                    ctx.lineWidth = strokeWidth;
                    ctx.strokeStyle = strokeColor ?? "#ffffff";
                    ctx.stroke();
                }
                if (fillColor) {
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                }
                ctx.closePath();
            }
        }
        const completedIds = [];
        for (const [ id, animatingCanvasObject ] of animatingCanvasObjects) {
            const { type, startedTime: st, duration, delay, easing } = animatingCanvasObject;
            if (delay) {
                const t = Date.now() - st;
                if (t < delay) {
                    continue;
                }
            }
            const startedTime = st + (delay ?? 0);
            if (type === CanvasObjectType.Line) {
                const { from: f, to: _to, lineWidth, color, disappearing, resolve } = animatingCanvasObject;
                const from = Vec2.from(f).mul({ x: canvas.width, y: canvas.height });
                const to = Vec2.from(_to).mul({ x: canvas.width, y: canvas.height });
                let t = (Date.now() - startedTime) / animatingCanvasObject.duration;
                if (disappearing) {
                    t = 1 - t;
                }
                if (!disappearing && t >= 1) {
                    completedCanvasObjects.set(id, {
                        type: CanvasObjectType.Line,
                        from: animatingCanvasObject.from,
                        to: animatingCanvasObject.to,
                        lineWidth: animatingCanvasObject.lineWidth,
                        color: animatingCanvasObject.color,
                    });
                    resolve(id);
                    completedIds.push(id);
                    ctx.beginPath();
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = color;
                    ctx.moveTo(from.x, from.y);
                    ctx.lineTo(to.x, to.y);
                    ctx.stroke();
                    ctx.closePath();
                    continue;
                }
                if (disappearing && t <= 0) {
                    resolve(id);
                    completedIds.push(id);
                    continue;
                }
                const easingFunction = Ease.easingFunctionMap[easing];
                const lineEnd = Vec2.from(from).lerp(to, easingFunction(t));
                ctx.beginPath();
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = color;
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(lineEnd.x, lineEnd.y);
                ctx.stroke();
                ctx.closePath();
            }
            else if (type === CanvasObjectType.Circle) {
                const {
                    center: c,
                    radius,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    disappearing,
                    resolve,
                } = animatingCanvasObject;
                const center = Vec2.from(c).mul({ x: canvas.width, y: canvas.height });
                let t = (Date.now() - startedTime) / duration;
                if (disappearing) {
                    t = 1 - t;
                }
                if (!disappearing && t >= 1) {
                    completedCanvasObjects.set(id, {
                        type: CanvasObjectType.Circle,
                        center: c,
                        radius,
                        strokeWidth,
                        strokeColor,
                        fillColor,
                    });
                    resolve(id);
                    completedIds.push(id);
                    ctx.beginPath();
                    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
                    if (strokeWidth) {
                        ctx.lineWidth = strokeWidth;
                        ctx.strokeStyle = strokeColor ?? "#ffffff";
                        ctx.stroke();
                    }
                    if (fillColor) {
                        ctx.fillStyle = fillColor;
                        ctx.fill();
                    }
                    ctx.closePath();
                    continue;
                }
                if (disappearing && t <= 0) {
                    resolve(id);
                    completedIds.push(id);
                    continue;
                }
                const easingFunction = Ease.easingFunctionMap[easing];
                const currentRadius = radius * easingFunction(t);
                ctx.beginPath();
                ctx.arc(center.x, center.y, currentRadius, 0, Math.PI * 2);
                if (strokeWidth) {
                    ctx.lineWidth = strokeWidth;
                    ctx.strokeStyle = strokeColor ?? "#ffffff";
                    ctx.stroke();
                }
                if (fillColor) {
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                }
                ctx.closePath();
            }
            else if (type === CanvasObjectType.Rectangle) {
                const {
                    from: f,
                    to: _to,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    disappearing,
                    resolve,
                } = animatingCanvasObject;
                const from = Vec2.from(f).mul({ x: canvas.width, y: canvas.height });
                const to = Vec2.from(_to).mul({ x: canvas.width, y: canvas.height });
                let t = (Date.now() - startedTime) / duration;
                if (disappearing) {
                    t = 1 - t;
                }
                if (!disappearing && t >= 1) {
                    completedCanvasObjects.set(id, {
                        type: CanvasObjectType.Rectangle,
                        from: f,
                        to: _to,
                        strokeWidth,
                        strokeColor,
                        fillColor,
                    });
                    resolve(id);
                    completedIds.push(id);
                    ctx.beginPath();
                    ctx.rect(from.x, from.y, to.x - from.x, to.y - from.y);
                    if (strokeWidth) {
                        ctx.lineWidth = strokeWidth;
                        ctx.strokeStyle = strokeColor ?? "#ffffff";
                        ctx.stroke();
                    }
                    if (fillColor) {
                        ctx.fillStyle = fillColor;
                        ctx.fill();
                    }
                    ctx.closePath();
                    continue;
                }
                if (disappearing && t <= 0) {
                    resolve(id);
                    completedIds.push(id);
                    continue;
                }
                const easingFunction = Ease.easingFunctionMap[easing];
                const center = Vec2.add(from, to).mulScalar(0.5);
                const currentFrom = center.clone.lerp(from, easingFunction(t));
                const currentTo = center.clone.lerp(to, easingFunction(t));
                ctx.beginPath();
                ctx.rect(currentFrom.x, currentFrom.y, currentTo.x - currentFrom.x, currentTo.y - currentFrom.y);
                if (strokeWidth) {
                    ctx.lineWidth = strokeWidth;
                    ctx.strokeStyle = strokeColor ?? "#ffffff";
                    ctx.stroke();
                }
                if (fillColor) {
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                }
                ctx.closePath();
            }
        }

        for (const id of completedIds) {
            animatingCanvasObjects.delete(id);
        }
    }

    export const init = (canvas: HTMLCanvasElement) => {
        setInterval(() => {
            redraw(canvas);
        }, 1000 / 60);
    }

    export const destroy = (id: number) => {
        completedCanvasObjects.delete(id);
        animatingCanvasObjects.delete(id);
    }

    export type DisappearOptions = {
        duration: number;
        easing?: Ease.Easing;
    }
    export const disappear = async (id: number, options: DisappearOptions) => {
        const completedCanvasObject = completedCanvasObjects.get(id);
        if (!completedCanvasObject) {
            const animatingCanvasObject = animatingCanvasObjects.get(id);
            if (!animatingCanvasObject) return;
            const { disappearing } = animatingCanvasObject;
            if (disappearing) return;
            animatingCanvasObject.disappearing = true;
            return new Promise<void>(r => {
                animatingCanvasObject.resolve = (id) => {
                    r();
                }
            });
        }
        return new Promise<void>(r => {
            const resolve = (id: number) => {
                r();
            };
            const animatingCanvasObject: AnimatingCanvasObject = {
                ...completedCanvasObject,
                startedTime: Date.now(),
                duration: options.duration,
                disappearing: true,
                easing: options.easing ?? Ease.Easing.EaseInOutSine, // Added easing property
                resolve,
            };
            completedCanvasObjects.delete(id);
            animatingCanvasObjects.set(id, animatingCanvasObject);
        });
    }
    export const disappearSync = (id: number, options: DisappearOptions) => {
        const completedCanvasObject = completedCanvasObjects.get(id);
        if (!completedCanvasObject) {
            const animatingCanvasObject = animatingCanvasObjects.get(id);
            if (!animatingCanvasObject) return;
            const { disappearing } = animatingCanvasObject;
            if (disappearing) return;
            animatingCanvasObject.disappearing = true;
            return;
        }
        const animatingCanvasObject: AnimatingCanvasObject = {
            ...completedCanvasObject,
            startedTime: Date.now(),
            duration: options.duration,
            disappearing: true,
            easing: options.easing ?? Ease.Easing.EaseInOutSine, // Added easing property
            resolve: (id) => {},
        };
        completedCanvasObjects.delete(id);
        animatingCanvasObjects.set(id, animatingCanvasObject);
    }

    export type DrawLineOptions = {
        from: Vec2Like;
        to: Vec2Like;
        lineWidth: number;
        color: string;
        duration: number;
        delay?: number;
        easing?: Ease.Easing;
    }
    export const drawLine = async (canvas: HTMLCanvasElement, options: DrawLineOptions) => {
        return new Promise<number>(r => {
            const id = createId();
            const { from: f, to: t, lineWidth, color, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
            const from = Vec2.from(f).div({ x: canvas.width, y: canvas.height });
            const to = Vec2.from(t).div({ x: canvas.width, y: canvas.height });
            const startTime = Date.now();
            const resolve = (id: number) => {
                r(id);
            };
            if (duration <= 0) {
                const completedCanvasObject: CompletedCanvasObject = {
                    type: CanvasObjectType.Line,
                    from,
                    to,
                    lineWidth,
                    color,
                };
                completedCanvasObjects.set(id, completedCanvasObject);
            }
            else {
                const animatingCanvasObject: AnimatingCanvasObject = {
                    type: CanvasObjectType.Line,
                    startedTime: startTime,
                    duration,
                    delay,
                    disappearing: false,
                    easing,
                    from,
                    to,
                    lineWidth,
                    color,
                    resolve,
                };
                animatingCanvasObjects.set(id, animatingCanvasObject);
            }
        });
    }
    export const drawLineSync = (canvas: HTMLCanvasElement, options: DrawLineOptions) => {
        const id = createId();
        const { from: f, to: t, lineWidth, color, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
        const from = Vec2.from(f).div({ x: canvas.width, y: canvas.height });
        const to = Vec2.from(t).div({ x: canvas.width, y: canvas.height });
        const startTime = Date.now();
        if (duration <= 0) {
            const completedCanvasObject: CompletedCanvasObject = {
                type: CanvasObjectType.Line,
                from,
                to,
                lineWidth,
                color,
            };
            completedCanvasObjects.set(id, completedCanvasObject);
        }
        else {
            const animatingCanvasObject: AnimatingCanvasObject = {
                type: CanvasObjectType.Line,
                startedTime: startTime,
                duration,
                delay,
                disappearing: false,
                easing,
                from,
                to,
                lineWidth,
                color,
                resolve: (id) => {},
            };
            animatingCanvasObjects.set(id, animatingCanvasObject);
        }
        return id;
    }

    export type DrawCircleOptions = {
        center: Vec2Like;
        radius: number;
        strokeWidth?: number;
        strokeColor?: string;
        fillColor?: string;
        duration: number;
        delay?: number;
        easing?: Ease.Easing;
    }
    export const drawCircle = async (canvas: HTMLCanvasElement, options: DrawCircleOptions) => {
        return new Promise<number>(r => {
            const id = createId();
            const { center: c, radius, strokeWidth, strokeColor, fillColor, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
            const center = Vec2.from(c).div({ x: canvas.width, y: canvas.height });
            const startTime = Date.now();
            const resolve = (id: number) => {
                r(id);
            };
            if (duration <= 0) {
                const completedCanvasObject: CompletedCanvasObject = {
                    type: CanvasObjectType.Circle,
                    center,
                    radius,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                };
                completedCanvasObjects.set(id, completedCanvasObject);
            }
            else {
                const animatingCanvasObject: AnimatingCanvasObject = {
                    type: CanvasObjectType.Circle,
                    startedTime: startTime,
                    duration,
                    delay,
                    disappearing: false,
                    easing,
                    center,
                    radius,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    resolve,
                };
                animatingCanvasObjects.set(id, animatingCanvasObject);
            }
        });
    }
    export const drawCircleSync = (canvas: HTMLCanvasElement, options: DrawCircleOptions) => {
        const id = createId();
        const { center: c, radius, strokeWidth, strokeColor, fillColor, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
        const center = Vec2.from(c).div({ x: canvas.width, y: canvas.height });
        const startTime = Date.now();
        if (duration <= 0) {
            const completedCanvasObject: CompletedCanvasObject = {
                type: CanvasObjectType.Circle,
                center,
                radius,
                strokeWidth,
                strokeColor,
                fillColor,
            };
            completedCanvasObjects.set(id, completedCanvasObject);
        }
        else {
            const animatingCanvasObject: AnimatingCanvasObject = {
                type: CanvasObjectType.Circle,
                startedTime: startTime,
                duration,
                delay,
                disappearing: false,
                easing,
                center,
                radius,
                strokeWidth,
                strokeColor,
                fillColor,
                resolve: (id) => {},
            };
            animatingCanvasObjects.set(id, animatingCanvasObject);
        }
        return id;
    }

    export type DrawRectangleOptions = {
        from: Vec2Like;
        to: Vec2Like;
        strokeWidth?: number;
        strokeColor?: string;
        fillColor?: string;
        duration: number;
        delay?: number;
        easing?: Ease.Easing;
    }
    export const drawRectangle = async (canvas: HTMLCanvasElement, options: DrawRectangleOptions) => {
        return new Promise<number>(r => {
            const id = createId();
            const { from: f, to: t, strokeWidth, strokeColor, fillColor, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
            const from = Vec2.from(f).div({ x: canvas.width, y: canvas.height });
            const to = Vec2.from(t).div({ x: canvas.width, y: canvas.height });
            const startTime = Date.now();
            const resolve = (id: number) => {
                r(id);
            };
            if (duration <= 0) {
                const completedCanvasObject: CompletedCanvasObject = {
                    type: CanvasObjectType.Rectangle,
                    from,
                    to,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                };
                completedCanvasObjects.set(id, completedCanvasObject);
            }
            else {
                const animatingCanvasObject: AnimatingCanvasObject = {
                    type: CanvasObjectType.Rectangle,
                    startedTime: startTime,
                    duration,
                    delay,
                    disappearing: false,
                    easing,
                    from,
                    to,
                    strokeWidth,
                    strokeColor,
                    fillColor,
                    resolve,
                };
                animatingCanvasObjects.set(id, animatingCanvasObject);
            }
        });
    }
    export const drawRectangleSync = (canvas: HTMLCanvasElement, options: DrawRectangleOptions) => {
        const id = createId();
        const { from: f, to: t, strokeWidth, strokeColor, fillColor, duration, delay, easing = Ease.Easing.EaseInOutSine } = options;
        const from = Vec2.from(f).div({ x: canvas.width, y: canvas.height });
        const to = Vec2.from(t).div({ x: canvas.width, y: canvas.height });
        const startTime = Date.now();
        if (duration <= 0) {
            const completedCanvasObject: CompletedCanvasObject = {
                type: CanvasObjectType.Rectangle,
                from,
                to,
                strokeWidth,
                strokeColor,
                fillColor,
            };
            completedCanvasObjects.set(id, completedCanvasObject);
        }
        else {
            const animatingCanvasObject: AnimatingCanvasObject = {
                type: CanvasObjectType.Rectangle,
                startedTime: startTime,
                duration,
                delay,
                disappearing: false,
                easing,
                from,
                to,
                strokeWidth,
                strokeColor,
                fillColor,
                resolve: (id) => {},
            };
            animatingCanvasObjects.set(id, animatingCanvasObject);
        }
        return id;
    }
}