const calculator = document.querySelector('.calculator') as HTMLDivElement;
const buttons = Array.from(document.querySelectorAll('.button')) as HTMLSpanElement[];
const formulaElement = document.getElementById('formula') as HTMLSpanElement;
const formulaCopyElement = document.getElementById('formula-copy') as HTMLSpanElement;
let isVisible = true;

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
    let added = true;
    formula = formula
        .replace(/([^0-9])0+(\(|-|[0-9]+)/g, (_: string, a: string, b: string) => {
            added = false;
            return `${a}${b}`;
        })
        .replace(/^0+(\(|-|[0-9]+)/g, (_: string, a: string) => {
            added = false;
            return a;
        })
        .replace(/(×|÷|-|\+)(×|÷|-|\+)/g, (_: string, a: string, b: string) => {
            added = false;
            return b;
        })
        .replace(/^\./g, (_: string) => {
            added = false;
            return "";
        })
        .replace(/([^0-9]+)\./g, (_: string, a: string) => {
            added = false;
            return a;
        });
    if (added) moveHead("right");

    updateFormula();
}

let fontSize = 22;
const ratioList: number[] = [];

const updateFormula = () => {
    if (formula === "") formula = "0";

    const temp = `${formula.slice(0, head)}{HeadPoint}${formula.slice(head)}`
        .replace(/\s*(×|÷|-|\+)\s*/g, " $1 ")
        .replaceAll(" ", "&nbsp;");
    const showedFormula = temp.replace("{HeadPoint}", "");
    const formulaCopy = temp.split("{HeadPoint}")[0];
    const headIndex = temp.indexOf("{HeadPoint}");

    if (headIndex === -1) return;

    formulaElement.innerHTML = showedFormula;
    formulaCopyElement.innerHTML = `${formulaCopy}`;
    const cursorElement = document.createElement("span");

    cursorElement.style.color = `#ffffff${isVisible ? "EE" : "05"}`;
    cursorElement.textContent = "|";
    cursorElement.classList.add("cursor");

    formulaCopyElement.appendChild(cursorElement);

    const ratio = 270 / formulaElement.clientWidth;
    if (ratio > 1) {
        if (ratioList.length === 0) return;

        fontSize /= ratioList.pop()!;
        formulaElement.style.fontSize = `${fontSize.toFixed(2)}px`;
        cursorElement.style.fontSize = `${fontSize.toFixed(2)}px`;
        formulaCopyElement.style.fontSize = `${fontSize.toFixed(2)}px`;
        return;
    }

    ratioList.push(ratio);
    fontSize *= ratio;
    formulaElement.style.fontSize = `${fontSize.toFixed(2)}px`;
    cursorElement.style.fontSize = `${fontSize.toFixed(2)}px`;
    formulaCopyElement.style.fontSize = `${fontSize.toFixed(2)}px`;
}

const getAnswer = () => {
    const result = operateFormula(formula);

    if (result === undefined || isNaN(result)) return;

    formula = `${result}`;
    moveHead("none");
    updateFormula();
}


setInterval(() => {
    const cursor = document.getElementsByClassName("cursor")[0] as HTMLSpanElement;

    if (!cursor) return;

    cursor.style.color = `#ffffff${isVisible ? "05" : "EE"}`;
    isVisible = !isVisible;
}, 500);

addEventListener("keydown", eventData => {
    console.log(eventData.key)
    switch (eventData.key) {
        case "ArrowLeft":
            moveHead("left");
            break;
        case "ArrowRight":
            moveHead("right");
            break;

        case "Backspace":
            backspace();
            break;

        case ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].find(key => key === eventData.key):
            addCharacter(eventData.key);
            break;
        
        case "-":
            addCharacter("-");
            break;
        case "+":
            addCharacter("+");
            break;
        case "*":
            addCharacter("×");
            break;
        case "/":
            addCharacter("÷");
            break;

        case "Enter":
            getAnswer();
    }
})