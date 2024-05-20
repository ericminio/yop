export const dashCaseToPascalCase = (dash) =>
    dash.split('-').reduce((pascal, word) => pascal + capitalize(word), '');

const capitalize = (word) => {
    const letters = word.split('');
    letters[0] = letters[0].toUpperCase();

    return letters.join('');
};
