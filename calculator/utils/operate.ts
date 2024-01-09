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
            const regExps = [
                /root(\d+(?:\.\d+)?)/g, // sqrt
                /(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g, // power
                /(\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)/g, // multiply
                /(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)/g, // divide
                /(\d+(?:\.\d+)?)\+(\d+(?:\.\d+)?)/g, // add
                /(\d+(?:\.\d+)?)\-(\d+(?:\.\d+)?)/g, // sub
            ];
            while (regExps.some(regExp => regExp.test(formula))) {
                formula = formula.replace(regExps[0], (_: string, a: string) => String(Math.sqrt(+a)));
                formula = formula.replace(regExps[1], (_: string, a: string, b: string) => String((+a) ** +b));
                formula = formula.replace(regExps[2], (_: string, a: string, b: string) => String(+a * +b));
                formula = formula.replace(regExps[3], (_: string, a: string, b: string) => String(+a / +b));
                formula = formula.replace(regExps[4], (_: string, a: string, b: string) => String(+a + +b));
                formula = formula.replace(regExps[5], (_: string, a: string, b: string) => String(+a - +b));
            }
            return +formula;
        }
    }

    return operateFormula_(formula.replaceAll(" ", ""));
}

const abc = operateFormula("2 * root(2) * 3 * root(2)");

console.log(abc);