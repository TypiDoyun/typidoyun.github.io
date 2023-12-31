const parentheses = [ "(", ")" ];

const isParentheses = (character: string) => parentheses.includes(character);

const isValidFormula = (formula: string) => {
    let amountOfparentheses = 0;
    let isValid = true;

    for (const character of formula) {
        if (character === "(") amountOfparentheses++;
        else if (character === ")") amountOfparentheses--;
        if (amountOfparentheses >= 0) continue;

        isValid = false;
        break;
    }

    if (amountOfparentheses > 0) isValid = false;

    return isValid;
}

const hasInnerFormula = (formula: string) => {
    if (!isValidFormula(formula)) return false;
    if (formula.includes("(")) return true;
    return false;
}

const getInnerFormulas = (formula: string) => {
    if (!isValidFormula(formula)) return undefined;
    if (!hasInnerFormula(formula)) return [];

    const formulas: string[] = [];
    let depth = 0;
    let buffer = "";

    for (const character of formula) {
        if (character === "(") depth++;
        if (character === ")") depth--;

        if (depth === 1 && character === "(") continue;
        if (depth === 0 && character === ")") {
            formulas.push(buffer);
            buffer = "";
            continue;
        }
        if (depth !== 0) buffer += character;
    }

    return formulas;
}

const operateFormula = (formula: string) => {
    const operateFormula_ = (formula: string): number | undefined => {
        if (!isValidFormula(formula)) return undefined;
        if (hasInnerFormula(formula)) {
            for (const innerFormula of getInnerFormulas(formula)!) {
                const result = operateFormula(innerFormula);
                formula = formula.replaceAll(`(${innerFormula})`, `${result}`);
            }
            return operateFormula(formula);
        } else {
            formula = formula.replace(/root(\d+(?:\.\d+)?)/g, (_: string, a: string) => String(Math.sqrt(+a)));
            formula = formula.replace(/(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g, (_: string, a: string, b: string) => String((+a) ** +b));
            formula = formula.replace(/(\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)/g, (_: string, a: string, b: string) => String(+a * +b));
            formula = formula.replace(/(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)/g, (_: string, a: string, b: string) => String(+a / +b));
            formula = formula.replace(/(\d+(?:\.\d+)?)\+(\d+(?:\.\d+)?)/g, (_: string, a: string, b: string) => String(+a + +b));
            formula = formula.replace(/(\d+(?:\.\d+)?)\-(\d+(?:\.\d+)?)/g, (_: string, a: string, b: string) => String(+a - +b));
            return +formula;
        }
    }

    return operateFormula_(formula.replaceAll(" ", ""));
}

const abc = operateFormula("");

console.log(abc);