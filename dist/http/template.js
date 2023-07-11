import { contentOfFile } from '../index.js';

const pattern = /^\/template\/(.*)/;

export const template = (base) => (incoming) => {
    const data = pattern.exec(incoming.url);
    const url = data[1];
    const file = new URL(`${base}/${url}`);
    return {
        content: contentOfFile(file),
        contentType: 'text/html',
    };
};
