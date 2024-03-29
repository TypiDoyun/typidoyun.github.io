const parentheses = [ "(", ")" ];

const isParentheses = (character: string) => parentheses.includes(character);

const isValidFormula = (formula: string) => {
    if (formula === "") return false;
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

const convert = (num: number) => {
    return num >= 0 ? `+${num}` : `${num}`;
}

const getInnerFormulas = (formula: string) => {
    if (!isValidFormula(formula)) return undefined;
    if (!hasInnerFormula(formula)) return [];

    const formulas: [ string, boolean ][] = [];
    let depth = 0;
    let buffer = "";
    let isMinus = false;

    let index = -1;

    for (const character of formula) {
        index += 1;

        
        if (character === "(") {
            depth++;
            if (formula[index] === "-") isMinus = true;
        }
        if (character === ")") depth--;

        if (depth === 1 && character === "(") continue;
        if (depth === 0 && character === ")") {
            formulas.push([ buffer, isMinus ]);
            isMinus = false;
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
            const powerReg = /\(((?:-|\+)?\d+(?:\.\d+)?)\)\^((?:-|\+)?\d+(?:\.\d+)?)/g; // power
            const powerReg2 = /\(((?:-|\+)?\d+(?:\.\d+)?)\)\^\(((?:-|\+)?\d+(?:\.\d+)?)\)/g; // power

            if (powerReg.test(formula)) formula = formula.replace(powerReg, (_: string, a: string, b: string) => convert((+a) ** +b));
            if (powerReg2.test(formula)) formula = formula.replace(powerReg2, (_: string, a: string, b: string) => convert((+a) ** +b));

            formula = formula
                .replaceAll("-+", "-")
                .replaceAll("+-", "-")
                .replaceAll("++", "+")
                .replaceAll("--", "+")

            for (const [ innerFormula, isMinus ] of getInnerFormulas(formula)!) {
                const result = operateFormula_(innerFormula);
                if (result === undefined) formula = "NaN";
                else if (isMinus) {
                    formula = formula.replaceAll(`-(${innerFormula})`, convert(-result));
                } else {
                    formula = formula.replaceAll(`(${innerFormula})`, convert(result));
                }
                formula = formula
                    .replaceAll("-+", "-")
                    .replaceAll("+-", "-")
                    .replaceAll("++", "+")
                    .replaceAll("--", "+")
                
            }
            return operateFormula(formula);
        } else {
            const regExps = [
                /root(\d+(?:\.\d+)?)/g, // sqrt
                /((?:-|\+)?\d+(?:\.\d+)?)\^((?:-|\+)?\d+(?:\.\d+)?)/g, // power
                /((?:-|\+)?\d+(?:\.\d+)?)\×((?:-|\+)?\d+(?:\.\d+)?)/g, // multiply
                /((?:-|\+)?\d+(?:\.\d+)?)\÷((?:-|\+)?\d+(?:\.\d+)?)/g, // divide
                /((?:-|\+)?\d+(?:\.\d+)?)\+((?:-|\+)?\d+(?:\.\d+)?)/g, // add
                /((?:-|\+)?\d+(?:\.\d+)?)\-((?:-|\+)?\d+(?:\.\d+)?)/g, // sub
            ];
            while (regExps.some(regExp => regExp.test(formula))) {
                formula = formula.replace(regExps[0], (_: string, a: string) => convert(Math.sqrt(+a)));
                formula = formula.replace(regExps[1], (_: string, a: string, b: string) => convert((+a) ** +b));
                formula = formula.replace(regExps[2], (_: string, a: string, b: string) => convert(+a * +b));
                formula = formula.replace(regExps[3], (_: string, a: string, b: string) => convert(+a / +b));
                formula = formula.replace(regExps[4], (_: string, a: string, b: string) => convert(+a + +b));
                formula = formula.replace(regExps[5], (_: string, a: string, b: string) => convert(+a - +b));
            }
            return +formula;
        }
    }

    return operateFormula_(formula.replaceAll(" ", ""));
}