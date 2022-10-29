import fs from 'fs';

const content = (file) => fs.readFileSync(file).toString();

export const expose = ({ symbol, file }) => {
    return (new Function(`${content(file)}; return ${symbol}`))();
};