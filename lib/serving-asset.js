import { contentOfFile } from './content-of-file.js';

const mime = {
    'html': 'text/html',
    'js': 'application/javascript',
    'css': 'text/css',
};

export const asset = (url) => {
    const content = contentOfFile(url);
    const type = mime[url.pathname.substring(url.pathname.lastIndexOf('.') + 1)];

    return (request, response) => {
        response.setHeader('Content-Length', content.length);
        response.setHeader('Content-Type', type);
        response.end(content);
    };
};
