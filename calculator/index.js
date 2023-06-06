"use strict";
const calculate = (x, y) => {
    return `${x}${y}`;
};
const renderOutput = (value) => {
    const outputElement = document.getElementById("result");
    if (!outputElement)
        throw new Error("cannot find output element");
    outputElement.innerText = value;
};
const onButtonClick = () => {
    const first = document.getElementById("first");
    const second = document.getElementById("second");
    if (!first || !second)
        throw new Error("cannot find input child");
    if (!(first instanceof HTMLInputElement) || !(second instanceof HTMLInputElement))
        return;
    const value = calculate(first.value, second.value);
    renderOutput(value);
};
