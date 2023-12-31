"use strict";
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const render = async (size) => {
    if (!context)
        return;
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight * 0.75;
    const width = canvas.width / size;
    for (let num = 1; num <= size; num++) {
        const x = canvas.width / size * (num - 1);
        const numberType = isPerfectNumber(num);
        context.beginPath();
        context.rect(x, 0, width, canvas.height);
        switch (numberType) {
            case NumberType.PerfectNumber:
                context.fillStyle = "#4BD964";
                break;
            case NumberType.DeficientNumber:
                context.fillStyle = "#FFC041";
                break;
            case NumberType.AbundantNumber:
                context.fillStyle = "#FF3A30";
                break;
        }
        context.fill();
        context.closePath();
        // await new Promise((resolve) => {
        //     setTimeout(() => resolve(null), 5);
        // });
    }
};
const result = document.getElementById("result");
let timeout;
const getResult = (num) => {
    if (num <= 0)
        return result.innerText = "자연수를 입력해주세요";
    console.log(num, typeof num);
    if (timeout !== undefined)
        clearTimeout(timeout);
    const numberType = isPerfectNumber(num);
    switch (numberType) {
        case NumberType.PerfectNumber:
            result.innerText = "완전수";
            break;
        case NumberType.DeficientNumber:
            result.innerText = "부족수";
            break;
        case NumberType.AbundantNumber:
            result.innerText = "과잉수";
            break;
    }
    timeout = setTimeout(() => result.innerText = '', 5000);
};
const sizeInput = document.getElementById("sizeInput");
const sizeText = document.getElementById("sizeText");
sizeInput.addEventListener("change", () => render(+sizeInput.value));
sizeInput.addEventListener("input", () => sizeText.innerText = sizeInput.value);
addEventListener("load", () => render(100));
