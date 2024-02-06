var NumberType;
(function (NumberType) {
    NumberType[NumberType["PerfectNumber"] = 0] = "PerfectNumber";
    NumberType[NumberType["DeficientNumber"] = 1] = "DeficientNumber";
    NumberType[NumberType["AbundantNumber"] = 2] = "AbundantNumber";
})(NumberType || (NumberType = {}));
const isPerfectNumber = (num) => {
    const divisors = getDivisors(num);
    let sumOfDivisors = 0;
    for (let index = 0; index < divisors.length; index++) {
        if (index !== divisors.length - 1)
            sumOfDivisors += divisors[index];
    }
    if (sumOfDivisors === num)
        return NumberType.PerfectNumber;
    if (sumOfDivisors > num)
        return NumberType.AbundantNumber;
    else
        return NumberType.DeficientNumber;
};
