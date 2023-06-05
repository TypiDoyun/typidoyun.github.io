var calculate = function (x, y) {
    return "".concat(x).concat(y);
};
var renderOutput = function (value) {
    var outputElement = document.getElementById("result");
    if (!outputElement)
        throw new Error("cannot find output element");
    outputElement.innerText = value;
};
var onButtonClick = function () {
    var first = document.getElementById("first");
    var second = document.getElementById("second");
    if (!first || !second)
        throw new Error("cannot find input child");
    if (!(first instanceof HTMLInputElement) || !(second instanceof HTMLInputElement))
        return;
    var value = calculate(first.value, second.value);
    renderOutput(value);
};
