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
let showedFormula = "0";
let head = 1;
let showedHead = 1;

const backspace = () => {
    if (formula[head - 1] === ")") {
        const couple = findCouple(head - 1, formula);

        if (couple !== undefined) {
            const [ min, max ] = [ Math.min(head - 1, couple), Math.max(head - 1, couple) ];

            if (formula[min - 1] === "^") {
                formula = formula.slice(0, min - 1) + formula.slice(max + 1);
                head = head - (max - min + 2);
                if (!addCharacter("")) moveHead("left");
                updateFormula();
                return;
            }
        }
    }
    
    if (formula[head - 1] === "(" && formula[head - 2] === "^") {
        const couple = findCouple(head - 1, formula);
        
        if (couple !== undefined) {
            const [ min, max ] = [ Math.min(head - 1, couple), Math.max(head - 1, couple) ]
            
            formula = formula.slice(0, min - 1) + formula.slice(min + 1, max) + formula.slice(max + 1);
            
            head = head - 2;
            if (!addCharacter("")) moveHead("left");
            updateFormula();
            
            return;
        }
    }
    
    if (formula[head - 1] === "(" || formula[head - 1] === ")") {
        const couple = findCouple(head - 1, formula);
        
        if (couple !== undefined) {
            const [ min, max ] = [ Math.min(head - 1, couple), Math.max(head - 1, couple) ];
            
            formula = formula.slice(0, min) + formula.slice(min + 1, max) + formula.slice(max + 1);
            
            head = head - 2;

            if (!addCharacter("")) moveHead("left");
            updateFormula();

            return;
        }
    }

    formula = formula.slice(0, head - 1) + formula.slice(head);

    addCharacter("");
    moveHead("left");

    updateFormula();
}

const addSquare = (value?: number) => {
    const temp = formula;
    let success = addCharacter(`^(${value ?? ""})`);
    if (!success) formula = temp;
    else moveHead("left");
    updateFormula();
}

const addBracket = () => {
    const temp = formula;
    let success = addCharacter(`(`);
    success = success && addCharacter(')');
    if (!success) formula = temp;
    else moveHead("left");
    updateFormula();
}

const moveHead = (direction: "right" | "left" | "none", backspaceMode: boolean = false) => {
    let value = 0;
    if (direction === "right") value++;
    else if (direction === "left") value--;

    head += value;

    if (!backspaceMode && formula[head - 1] === "^") head += value;

    head = Math.max(0, Math.min(formula.length, head));
    updateFormula();
    return true;
}

const findCouples = (formula: string): [ number, number ][] | undefined => {
    const stack: [ number, number? ][] = [];
    const result: [ number, number ][] = [];

    let index = -1;

    for (const character of formula) {
        index++;
        if (character === "(") stack.push([ index, undefined ]);
        if (character === ")") {
            const couple = stack.pop();

            if (!couple) return;

            couple[1] = index;

            result.push(couple as [ number, number ]);
        }
    }

    if (stack.length === 0) return result;
    else return;
}

const findCouple = (index: number, formula: string): number | undefined => {
    const couples = findCouples(formula);
    
    if (!couples) return;

    return couples.find(couple => couple[0] === index)?.[1] || couples.find(couple => couple[1] === index)?.[0];
}

const addCharacter = (character: string) => {
    formula = formula.slice(0, head) + character + formula.slice(head);
    let added = true;
    let move = true;
    formula = formula
        .replace(/([^0-9\.])0+(\(|-|[0-9]+)/g, (_: string, a: string, b: string) => {
            added = false;
            return `${a}${b}`;
        })
        .replace(/([^0-9|\)])\^/g, (_: string, a: string) => {
            added = move = false;
            return a;
        })
        .replace(/^\^/g, (_: string, a: string) => {
            added = move = false;
            return a;
        })
        .replace(/\)\d/g, (_: string, a: string) => {
            added = move = false;
            return ")";
        })
        .replace(/^0+(\(|-|[0-9]+)/g, (_: string, a: string) => {
            move = false;
            return a;
        })
        .replace(/(\d+)\(/g, (_: string, a: string) => {
            added = move = false;
            return a;
        })
        .replace(/\((?:×|÷|\+)/g, (_: string) => {
            added = move = false;
            return "(";
        })
        .replace(/(×|÷|-|\+)(×|÷|-|\+)/g, (_: string, a: string, b: string) => {
            added = move = false;
            return b;
        })
        .replace(/^(×|÷|\+)/g, (_: string) => {
            added = move = false;
            return "";
        })
        .replace(/^\./g, (_: string) => {
            added = move = false;
            return "";
        })
        .replace(/([^0-9]+)\./g, (_: string, a: string) => {
            added = move = false;
            return a;
        })
        .replace(/(\.\d*)\./g, (_: string, a: string) =>{
            added = move = false;
            return a;
        })
    if (move) {
        for (let i = 0; i < character.length; i++) {
            moveHead("right");
        }
    }

    updateFormula();

    return added;
}

const setCursorVisibility = (isVisible: boolean) => {
    const cursor = document.getElementsByClassName("cursor")[0] as HTMLSpanElement;
    
    if (!cursor) return;
    
    cursor.style.color = `#ffffff${isVisible ? "EE" : "05"}`;
    let coupleIndex = findCouple(showedHead - 1, showedFormula);
    let minIndex: number, maxIndex: number;
    
    if (coupleIndex !== undefined) {
        [ minIndex, maxIndex ] = [ Math.min(showedHead - 1, coupleIndex), Math.max(showedHead - 1, coupleIndex) ];
        const temp = `${showedFormula.slice(0, minIndex)}<span class="highlight">(</span>${showedFormula.slice(minIndex + 1, maxIndex)}<span class="highlight">)</span>${showedFormula.slice(maxIndex + 1)}`;
        formulaElement.innerHTML = temp;
        const highlights = Array.from(document.getElementsByClassName("highlight")) as HTMLElement[];
        
        for (const highlight of highlights) {
            highlight.style.backgroundColor = "#ffffff30";
        }
    }
    const couples = findCouples(formula);
    
    if (couples !== undefined) {
        cursor.style.top = "50%";
        cursor.innerHTML = "|";
        for (const couple of couples) {
            [ minIndex, maxIndex ] = [ Math.min(couple[0], couple[1]), Math.max(couple[0], couple[1]) ];
            
            if (head <= minIndex || head > maxIndex) continue;
            if (formula[minIndex - 1] !== "^") continue;
            
            cursor.style.top = "calc(50% - 3px)";
            cursor.innerHTML = "<sup>|</sup>";
        }
    
    }

    
}

let fontSize = 22;
const ratioList: number[] = [];


const updateFormula = () => {
    if (formula === "") formula = "0", head = 1;
    let temp = `${formula.slice(0, head)}{HeadPoint}${formula.slice(head)}`
        .replace(/\s*(×|÷|-|\+)\s*/g, " $1 ")
        .replace(/\(\s-\s(\d+)/g, "(-$1")
    let nextIndex = 0;
    let text = "";
    temp
        .split("")
        .forEach((char, index) => {
            if (index < nextIndex) return;
            nextIndex++;
            if (char !== "^") return text += char;
            if (temp[index + 1] !== "(") return text += char;

            const couple = findCouple(index + 1, temp);

            if (couple === undefined) return text += char;

            const [ min, max ] = [ Math.min(index + 1, couple), Math.max(index + 1, couple) ];
            text += `<sup>${temp.slice(min + 1, max)}</sup>`;
            nextIndex = max + 1;
            
            return temp[index];
        })
    text = text
        .replaceAll(" ", "&nbsp;")
    showedFormula = text.replace("{HeadPoint}", "");
    const formulaCopy = text.split("{HeadPoint}")[0];
    const headIndex = text.indexOf("{HeadPoint}");
    showedHead = headIndex;

    if (headIndex === -1) return;

    formulaElement.innerHTML = showedFormula;
    formulaCopyElement.innerHTML = `${formulaCopy}`;
    const cursorElement = document.createElement("span");
    cursorElement.textContent = "|";
    cursorElement.classList.add("cursor");

    formulaCopyElement.appendChild(cursorElement);

    setCursorVisibility(isVisible);

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
    head = formula.length;
    moveHead("none");
    updateFormula();
}

setInterval(() => {
    isVisible = !isVisible;
    setCursorVisibility(isVisible);
}, 500);

addEventListener("keydown", eventData => {
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

        case ".":
            addCharacter(".");
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
        case "^":
            addSquare();
            break;
        
        case "(":
            addBracket();
            break;

        case "Enter":
            getAnswer();
    }
})