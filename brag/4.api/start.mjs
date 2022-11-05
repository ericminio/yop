import { asset, contentOfFile, Server } from '../../lib/index.js';

const serveHtml = asset(new URL('./index.html', import.meta.url));
const serveDecomposition = (incoming, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
        decomposition: [2, 3, 7]
    }));
};
const handler = (incoming, response) => {
    if (incoming.url.startsWith('/decompose')) {
        serveDecomposition(incoming, response);
    }
    else {
        serveHtml(incoming, response);
    }
};

export const server = new Server(5001, handler);

if (!process.argv[1].endsWith('mocha')) {

    server.start(port => {
        console.log(`listening on port ${port}`);
    });

}
