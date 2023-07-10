import { contentOfFile } from '../files/content-of-file.js';

export const expose = ({ symbol, file }) => {
    return new Function(`${contentOfFile(file)}; return ${symbol}`)();
};
