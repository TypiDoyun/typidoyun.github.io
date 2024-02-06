const calculatedPrimes = [2, 3, 5];
const getPrimes = (max) => {
    const lastPrime = calculatedPrimes[calculatedPrimes.length - 1];
    for (let num = lastPrime + 1; num <= max; num++) {
        const isNotPrime = calculatedPrimes.some(prime => num % prime === 0);
        if (isNotPrime)
            continue;
        calculatedPrimes.push(num);
    }
    return calculatedPrimes.filter(prime => prime <= max);
};
