import { contentOfFile } from './content-of-file.js';

export const exposex = ({ symbol, files }) => {
    const content = files.reduce((acc, file) => acc + contentOfFile(file), '');
    return new Function(`${content}; return ${symbol}`)();
};
