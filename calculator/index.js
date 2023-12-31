"use strict";
const calculator = document.querySelector('.calculator');
const buttons = Array.from(document.querySelectorAll('.button'));
for (const button of buttons) {
    button.addEventListener("click", clickEvent => {
        switchMode(button);
    });
}
const switchMode = (element) => {
    for (const button of buttons) {
        button.classList.remove("selected");
    }
    element.classList.add("selected");
};
makeDragable(calculator);
