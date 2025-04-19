import { Vec2 } from "vecs-ts";



export class Mouse {
    private static _mousePosition: Vec2 = new Vec2(0, 0);
    private static _initialized: boolean = false;
    public static get x(): number {
        return this._mousePosition.x;
    }
    public static get y(): number {
        return this._mousePosition.y;
    }

    private constructor() {}

    public static initialize() {
        if (this._initialized) return;
        this._initialized = true;
        window.addEventListener("mousemove", eventData => {
            Mouse._mousePosition.x = eventData.clientX;
            Mouse._mousePosition.y = eventData.clientY;
        });
    }
}