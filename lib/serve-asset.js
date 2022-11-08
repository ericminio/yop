import { contentOfFile } from './content-of-file.js';
import { notFound } from './route-404.js';

const mime = {
    'html': 'text/html',
    'js': 'application/javascript',
    'css': 'text/css',
};

export const serveAsset = (url) => {
    try {
        const content = contentOfFile(url);
        const extension = url.pathname.substring(url.pathname.lastIndexOf('.') + 1);
        const type = mime[extension];

        return (request, response) => {
            response.setHeader('Content-Length', content.length);
            response.setHeader('Content-Type', type);
            response.end(content);
        };
    }
    catch (error) {
        return notFound;
    }
};
