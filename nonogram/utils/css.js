const opacityAnimation = [
    { opacity: "0", display: "inline-block" },
    { opacity: "0.2" },
    { opacity: "0", display: "none" }
];
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
];
export var CSS;
(function (CSS) {
    CSS.setProperty = (name, value) => document.documentElement.style.setProperty(name, value);
    CSS.giveStyle = (element, styles) => {
        for (const key in styles) {
            element.style.setProperty(key, styles[key]);
        }
    };
    CSS.blinkOnce = (element, duration) => {
        element.animate(opacityAnimation, {
            duration,
            easing: "ease"
        });
    };
    CSS.shakeOnce = (element, duration) => {
        element.animate(shakeAnimation, {
            duration,
            easing: "ease"
        });
    };
})(CSS || (CSS = {}));
