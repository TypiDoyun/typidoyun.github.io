const calculator = document.querySelector('.calculator');
const buttons = Array.from(document.querySelectorAll('.button'));
const formulaElement = document.getElementById('formula');
const formulaCopyElement = document.getElementById('formula-copy');
let isVisible = true;
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
let formula = "0";
let showedFormula = "0";
let head = 1;
let showedHead = 1;
const backspace = () => {
    formula = formula.slice(0, head - 1) + formula.slice(head);
    moveHead("left");
    updateFormula();
};
const moveHead = (direction) => {
    if (direction === "right")
        head++;
    else if (direction === "left")
        head--;
    head = Math.max(0, Math.min(formula.length, head));
    updateFormula();
};
const findCouples = (formula) => {
    const stack = [];
    const result = [];
    let index = -1;
    for (const character of formula) {
        index++;
        if (character === "(")
            stack.push([index, undefined]);
        if (character === ")") {
            const couple = stack.pop();
            if (!couple)
                return;
            couple[1] = index;
            result.push(couple);
        }
    }
    if (stack.length === 0)
        return result;
    else
        return;
};
const findCouple = (index, formula) => {
    const couples = findCouples(formula);
    if (!couples)
        return;
    return couples.find(couple => couple[0] === index)?.[1] || couples.find(couple => couple[1] === index)?.[0];
};
const addCharacter = (character) => {
    formula = formula.slice(0, head) + character + formula.slice(head);
    let added = true;
    formula = formula
        .replace(/([^0-9\.])0+(\(|-|[0-9]+)/g, (_, a, b) => {
        added = false;
        return `${a}${b}`;
    })
        .replace(/([^0-9|\)])\^/g, (_, a) => {
        added = false;
        return a;
    })
        .replace(/^\^/g, (_, a) => {
        added = false;
        return a;
    })
        .replace(/^0+(\(|-|[0-9]+)/g, (_, a) => {
        added = false;
        return a;
    })
        .replace(/(\d+)\(/g, (_, a) => {
        added = false;
        return a;
    })
        .replace(/\((?:×|÷|\+)/g, (_) => {
        added = false;
        return "(";
    })
        .replace(/(×|÷|-|\+)(×|÷|-|\+)/g, (_, a, b) => {
        added = false;
        return b;
    })
        .replace(/^(×|÷|\+)/g, (_) => {
        added = false;
        return "";
    })
        .replace(/^\./g, (_) => {
        added = false;
        return "";
    })
        .replace(/([^0-9]+)\./g, (_, a) => {
        added = false;
        return a;
    });
    if (added)
        moveHead("right");
    updateFormula();
};
const setCursorVisibility = (isVisible) => {
    const cursor = document.getElementsByClassName("cursor")[0];
    if (!cursor)
        return;
    cursor.style.color = `#ffffff${isVisible ? "EE" : "05"}`;
    const coupleIndex = findCouple(showedHead - 1, showedFormula);
    if (coupleIndex === undefined)
        return;
    const [minIndex, maxIndex] = [Math.min(showedHead - 1, coupleIndex), Math.max(showedHead - 1, coupleIndex)];
    const temp = `${showedFormula.slice(0, minIndex)}<span class="highlight">(</span>${showedFormula.slice(minIndex + 1, maxIndex)}<span class="highlight">)</span>${showedFormula.slice(maxIndex + 1)}`;
    formulaElement.innerHTML = temp;
    const highlights = Array.from(document.getElementsByClassName("highlight"));
    for (const highlight of highlights) {
        highlight.style.backgroundColor = "#ffffff30";
    }
};
let fontSize = 22;
const ratioList = [];
const updateFormula = () => {
    if (formula === "")
        formula = "0", head = 1;
    const temp = `${formula.slice(0, head)}{HeadPoint}${formula.slice(head)}`
        .replace(/\s*(×|÷|-|\+)\s*/g, " $1 ")
        .replace(/\(\s-\s(\d+)/g, "(-$1")
        .replace(/\^\((.+)\)/g, "<sup>$1</sup>")
        .replaceAll(" ", "&nbsp;");
    showedFormula = temp.replace("{HeadPoint}", "");
    const formulaCopy = temp.split("{HeadPoint}")[0];
    const headIndex = temp.indexOf("{HeadPoint}");
    showedHead = headIndex;
    if (headIndex === -1)
        return;
    formulaElement.innerHTML = showedFormula;
    formulaCopyElement.innerHTML = `${formulaCopy}`;
    const cursorElement = document.createElement("span");
    cursorElement.textContent = "|";
    cursorElement.classList.add("cursor");
    formulaCopyElement.appendChild(cursorElement);
    setCursorVisibility(isVisible);
    const ratio = 270 / formulaElement.clientWidth;
    if (ratio > 1) {
        if (ratioList.length === 0)
            return;
        fontSize /= ratioList.pop();
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
};
const getAnswer = () => {
    const result = operateFormula(formula);
    if (result === undefined || isNaN(result))
        return;
    formula = `${result}`;
    moveHead("none");
    updateFormula();
};
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
        case "(":
            addCharacter("(");
            break;
        case ")":
            addCharacter(")");
            break;
        case "Enter":
            getAnswer();
    }
});
