import { contentOfFile } from '../files/content-of-file.js';

export const exposeMethod = ({ signature, file }) => {
    const content = contentOfFile(file);
    const parts = content.split(`${signature} {`);
    const input = parts[1];
    let count = 1;
    let current = 0;
    while (count > 0 && current < input.length) {
        const char = input[current];
        if (char === '{') {
            count++;
        } else if (char === '}') {
            count--;
        }
        current++;
    }
    const code = `function ${signature} { ${input.substring(0, current - 1)} }`;
    const symbol = signature.split('(')[0].trim();

    return new Function(`${code}; return ${symbol}`)();
};
