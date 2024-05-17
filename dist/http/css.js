import { contentOfFile } from '../index.js';

export const css = (pattern, base) => (incoming) => {
    const data = pattern.exec(incoming.url);
    const url = data[1];
    const file = new URL(`${base}/${url}`);
    return {
        content: contentOfFile(file),
        contentType: 'text/css',
    };
};
