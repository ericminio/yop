const primeFactorsOf = (number) => {
    let factors = [];
    let factor = 2;

    while (number > 1) {
        while (number % factor === 0) {
            factors.push(factor);
            number /= factor;
        }
        factor++;
    }

    return factors;
};