import { encodeSingleFrameOfText, Router, Server, serveAssets, serveUpgrage } from '../../lib/index.js';

let sockets = [];
export const clearSockets = () => sockets = [];

const socketDataListener = (socket) => {
    sockets.push(socket);
};

const notify = (incoming, response) => {
    sockets.forEach(socket => socket.write(encodeSingleFrameOfText('hello world')));

    response.writeHead(200);
    response.end();
};

const router = new Router([
    { matches: (incoming) => incoming.url === '/connect', go: serveUpgrage(socketDataListener) },
    { matches: (incoming) => incoming.url === '/notify', go: notify },
    { matches: () => true, go: serveAssets(new URL('.', import.meta.url)) },
]);

export const server = new Server(5001, router.handler.bind(router));

if (!process.argv[1].endsWith('mocha')) {

    server.start(port => {
        console.log(`listening on port ${port}`);
    });

}
