type Style = {
    [key: string]: string;
}
const opacityAnimation = [
    { opacity: "0", display: "inline-block" },
    { opacity: "0.2" },
    { opacity: "0", display: "none" }
]
const shakeAnimation = [
    { transform: "translate(0, 0) rotate(0deg)" },
    { transform: "translate(5px, 5px) rotate(2deg)" },
    { transform: "translate(0, 0) rotate(0deg)" },
    { transform: "translate(-5px, 5px) rotate(-2deg)" },
    { transform: "translate(0, 0) rotate(0deg)" },
    { transform: "translate(5px, 5px) rotate(2deg)" },
    { transform: "translate(0, 0) rotate(0deg)" },
    { transform: "translate(-5px, 5px) rotate(-2deg)" },
    { transform: "translate(0, 0) rotate(0deg)" }
]

export namespace CSS {
    export const setProperty = (name: string, value: string) => document.documentElement.style.setProperty(name, value);
    export const giveStyle = (element: HTMLElement, styles: Style) => {
        for (const key in styles) {
            element.style.setProperty(key, styles[key]);
        }
    }
    export const blinkOnce = (element: HTMLElement, duration: number) => {
        element.animate(opacityAnimation, {
            duration,
            easing: "ease"
        });
    }
    export const shakeOnce = (element: HTMLElement, duration: number) => {
        element.animate(shakeAnimation, {
            duration,
            easing: "ease"
        });
    }
}