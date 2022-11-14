import { serveAssets, Router, Server } from '../../lib/index.js';
import { acceptHeader, decodeSingleFrameOfText, encodeSingleFrameOfText } from '../../lib/websocket-frames.js';

let sockets = [];
export const clearSockets = () => sockets = [];

const socketDataListener = (socket, data) => {
    sockets.push(socket);
};

const serveUpgrage = (listener) => (incoming, response) => {
    let socket = incoming.socket;
    socket.on('data', (data) => listener(socket, data));
    const key = incoming.headers['sec-websocket-key'];
    const accept = acceptHeader(key);

    response.writeHead(101, {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade',
        'Sec-WebSocket-Accept': accept
    });
    response.end();
}
const notify = (incoming, response) => {
    sockets.forEach(socket => {
        socket.write(encodeSingleFrameOfText('hello world'))
    });

    response.writeHead(200);
    response.end();
}

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
