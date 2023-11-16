const wire = (document) => {
    document
        .querySelector('#compute')
        .addEventListener('click', () => compute(document));
};
