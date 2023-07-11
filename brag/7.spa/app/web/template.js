import { contentOfFile } from '../../../../dist/index.js';

const pattern = /^\/template\/(.*)/;

export const template = (incoming) => {
    const data = pattern.exec(incoming.url);
    const url = data[1];
    const file = new URL(`./${url}`, import.meta.url);
    return {
        content: contentOfFile(file),
        contentType: 'text/html',
    };
};
