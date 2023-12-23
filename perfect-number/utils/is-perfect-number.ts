enum NumberType {
    PerfectNumber,
    DeficientNumber,
    AbundantNumber
}

const isPerfectNumber = (num: number): NumberType => {
    const divisors = getDivisors(num);

    let sumOfDivisors = 0;

    for (let index = 0; index < divisors.length; index++) {
        if (index !== divisors.length - 1) sumOfDivisors += divisors[index];
    }

    if (sumOfDivisors === num) return NumberType.PerfectNumber;
    if (sumOfDivisors > num) return NumberType.AbundantNumber;
    else return NumberType.DeficientNumber;
}