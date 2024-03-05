const calculator = document.querySelector('.calculator') as HTMLDivElement;
const buttons = Array.from(document.querySelectorAll('.button')) as HTMLSpanElement[];
const formulaElement = document.getElementById('formula') as HTMLSpanElement;
const formulaCopyElement = document.getElementById('formula-copy') as HTMLSpanElement;

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

let formula = "0";
let head = 1;

const backspace = () => {
    formula = formula.slice(0, head - 1) + formula.slice(head);
    moveHead("left");

    updateFormula();
}

const moveHead = (direction: "right" | "left" | "none") => {
    if (direction === "right") head++;
    else if (direction === "left") head--;

    head = Math.max(0, Math.min(formula.length, head));
    updateFormula();
}

const addCharacter = (character: string) => {
    formula = formula.slice(0, head) + character + formula.slice(head);
    formula = formula
        .replace(/([^0-9])0+(\(|-|[0-9]+)/g, "$1$2")
        .replace(/^0+(\(|-|[0-9]+)/g, "$1")
        .replace(/(×|÷|-|\+)(×|÷|-|\+)/g, "$2")
    moveHead("right");

    updateFormula();
}

let fontSize = 22;
const ratioList: number[] = [];

const updateFormula = () => {
    if (formula === "") formula = "0";

    const temp = `${formula.slice(0, head)}{HeadPoint}${formula.slice(head)}`.replace(/\s*(×|÷|-|\+)\s*/g, " $1 ")
    const showedFormula = temp.replace("{HeadPoint}", "");
    const formulaCopy = temp.split("{HeadPoint}")[0];
    const headIndex = temp.indexOf("{HeadPoint}");

    if (headIndex === -1) return;

    formulaElement.innerHTML = showedFormula;
    formulaCopyElement.innerHTML = `${formulaCopy.replaceAll(" ", "&nbsp;")}<span class="cursor">|</span>`;

    const ratio = 270 / formulaElement.clientWidth;
    if (ratio > 1) {
        if (ratioList.length === 0) return;

        fontSize /= ratioList.pop()!;
        formulaElement.style.fontSize = `${fontSize.toFixed(2)}px`;
        return;
    }

    ratioList.push(ratio);
    fontSize *= ratio;
    formulaElement.style.fontSize = `${fontSize.toFixed(2)}px`;
}

const getAnswer = () => {
    const result = operateFormula(formula);

    if (result === undefined || isNaN(result)) return;

    formula = `${result}`;
    moveHead("none");
    updateFormula();
}

let isVisible = true;

setInterval(() => {
    const cursor = document.getElementsByClassName("cursor")[0] as HTMLSpanElement;

    if (!cursor) return;

    console.log("on");

    cursor.style.color = `#ffffff${isVisible ? "00" : "FF"}`;
    isVisible = !isVisible;
}, 500);