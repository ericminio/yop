import { contentOfFile, Server } from '../../lib/index.js';

const indexFile = new URL('./index.html', import.meta.url);
const html = contentOfFile(indexFile);
const handler = (incoming, response) => {
    if (incoming.url.startsWith('/decompose')) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({
            decomposition: [2, 3, 7]
        }));
    }
    else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
    }
};

export const server = new Server(5001, handler);

if (!process.argv[1].endsWith('mocha')) {

    server.start(port => {
        console.log(`listening on port ${port}`);
    });

}
