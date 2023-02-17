import { contentOfFile, fileExists } from './content-of-file.js';
import { notFound } from './route-404.js';

const mime = {
    html: 'text/html',
    js: 'application/javascript',
    css: 'text/css',
};

export const serveAsset = (url) => {
    if (
        url.pathname.endsWith('/') &&
        fileExists(new URL('./index.html', url))
    ) {
        url = new URL('./index.html', url);
    }
    try {
        const content = contentOfFile(url);
        const extension = url.pathname.substring(
            url.pathname.lastIndexOf('.') + 1
        );
        const type = mime[extension];

        return (request, response) => {
            response.setHeader('Content-Length', content.length);
            response.setHeader('Content-Type', type);
            response.end(content);
        };
    } catch (error) {
        return notFound;
    }
};
