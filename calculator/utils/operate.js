"use strict";
const parentheses = ["(", ")"];
const isParentheses = (character) => parentheses.includes(character);
const isValidFormula = (formula) => {
    let amountOfparentheses = 0;
    let isValid = true;
    for (const character of formula) {
        if (character === "(")
            amountOfparentheses++;
        else if (character === ")")
            amountOfparentheses--;
        if (amountOfparentheses >= 0)
            continue;
        isValid = false;
        break;
    }
    if (amountOfparentheses > 0)
        isValid = false;
    return isValid;
};
const hasInnerFormula = (formula) => {
    if (!isValidFormula(formula))
        return false;
    if (formula.includes("("))
        return true;
    return false;
};
const getInnerFormulas = (formula) => {
    if (!isValidFormula(formula))
        return undefined;
    if (!hasInnerFormula(formula))
        return [];
    const formulas = [];
    let depth = 0;
    let buffer = "";
    for (const character of formula) {
        if (character === "(")
            depth++;
        if (character === ")")
            depth--;
        if (depth === 1 && character === "(")
            continue;
        if (depth === 0 && character === ")") {
            formulas.push(buffer);
            buffer = "";
            continue;
        }
        if (depth !== 0)
            buffer += character;
    }
    return formulas;
};
const operateFormula = (formula) => {
    const operateFormula_ = (formula) => {
        if (!isValidFormula(formula))
            return undefined;
        if (hasInnerFormula(formula)) {
            for (const innerFormula of getInnerFormulas(formula)) {
                const result = operateFormula(innerFormula);
                formula = formula.replaceAll(`(${innerFormula})`, `${result}`);
            }
            return operateFormula(formula);
        }
        else {
            formula = formula.replace(/root(\d+(?:.\d+)?)/g, (_, a) => String(Math.sqrt(+a)));
            formula = formula.replace(/(\d+(?:.\d+)?)\^(\d+(?:.\d+)?)/g, (_, a, b) => String((+a) ** +b));
            formula = formula.replace(/(\d+(?:.\d+)?)\*(\d+(?:.\d+)?)/g, (_, a, b) => String(+a * +b));
            formula = formula.replace(/(\d+(?:.\d+)?)\/(\d+(?:.\d+)?)/g, (_, a, b) => String(+a / +b));
            formula = formula.replace(/(\d+(?:.\d+)?)\+(\d+(?:.\d+)?)/g, (_, a, b) => String(+a + +b));
            formula = formula.replace(/(\d+(?:.\d+)?)\-(\d+(?:.\d+)?)/g, (_, a, b) => String(+a - +b));
            return +formula;
        }
    };
    return operateFormula_(formula.replaceAll(" ", ""));
};
const result = operateFormula("2^(3/2)");
console.log(result);
