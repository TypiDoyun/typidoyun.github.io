"use strict";
const getDivisors = (num) => {
    if (num <= 0)
        return [];
    const divisors = [1];
    const largeDivisors = [];
    const squareRoot = Math.sqrt(num);
    for (let divisor = 2; divisor <= squareRoot; divisor++) {
        if (num % divisor !== 0)
            continue;
        divisors.push(divisor);
        if (divisor !== squareRoot)
            largeDivisors.push(num / divisor);
    }
    for (let index = largeDivisors.length - 1; index >= 0; index--) {
        divisors.push(largeDivisors[index]);
    }
    if (num !== 1)
        divisors.push(num);
    return Array.from(divisors);
};
