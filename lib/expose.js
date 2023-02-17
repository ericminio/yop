import { contentOfFile } from './content-of-file.js';

export const expose = ({ symbol, file }) => {
    return new Function(`${contentOfFile(file)}; return ${symbol}`)();
};
