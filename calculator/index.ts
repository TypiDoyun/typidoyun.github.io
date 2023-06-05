const calculate = (x: string, y: string) => {
    return `${x}${y}`;
}

const renderOutput = (value: string) => {
    const outputElement = document.getElementById("result");

    if (!outputElement) throw new Error("cannot find output element");

    outputElement.innerText = value;
}

const onButtonClick = () => {
    const first = document.getElementById("first");
    const second = document.getElementById("second");

    if (!first || !second) throw new Error("cannot find input child");
    if (!(first instanceof HTMLInputElement) || !(second instanceof HTMLInputElement)) return;

    const value = calculate(first.value, second.value);
    renderOutput(value);
}