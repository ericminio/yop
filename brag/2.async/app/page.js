const element = (selector) => {
    return document.querySelector(selector);
};

const clearResult = (target) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            target.innerHTML = 'waiting...';
            resolve();
        }, 50);
    });
};
const decompose = (source) => {
    return async () => {
        const number = source.value;
        return await primeFactorsOf(number);
    };
};
const displayResult = (target) => {
    return (decomposition) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                target.innerHTML = decomposition.join(' x ');
                resolve();
            }, 50);
        });
    };
};
