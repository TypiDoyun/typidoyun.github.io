const calculator = document.querySelector('.calculator') as HTMLDivElement;
const buttons = Array.from(document.querySelectorAll('.button')) as HTMLSpanElement[];

for (const button of buttons) {
    button.addEventListener("click", clickEvent => {
        switchMode(button);
    })
}
const switchMode = (element: HTMLSpanElement) => {
    for (const button of buttons) {
        button.classList.remove("selected");
    }

    element.classList.add("selected");
}

makeDragable(calculator);
