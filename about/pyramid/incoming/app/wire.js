const wire = (document) => {
    document
        .querySelector('#compute')
        .addEventListener('click', () => compute(document));
    document
        .querySelector('#clear')
        .addEventListener('click', () => clear(document));
};
