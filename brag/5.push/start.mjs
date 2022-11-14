import { serveAssets, Router, Server } from '../../lib/index.js';
import { acceptHeader } from './acceptHeader.js';
const encode = (text) => {
    let buffer = Buffer.alloc(2 + text.length);
    buffer[0] = 0x81;
    buffer[1] = text.length;
    Buffer.from(text).copy(buffer, 2);

    return buffer;
};

let socket;
const serveUpgrage = (incoming, response) => {
    socket = incoming.socket;
    const key = incoming.headers['sec-websocket-key'];
    const accept = acceptHeader(key);

    response.writeHead(101, {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade',
        'Sec-WebSocket-Accept': accept
    });
    response.end();
}
const pushMessage = (incoming, response) => {
    socket.write(encode('hello world'));
    response.writeHead(200);
    response.end();
}

const router = new Router([
    { matches: (incoming) => incoming.url === '/connect', go: serveUpgrage },
    { matches: (incoming) => incoming.url === '/broadcast', go: pushMessage },
    { matches: () => true, go: serveAssets(new URL('.', import.meta.url)) },
]);

export const server = new Server(5001, router.handler.bind(router));

if (!process.argv[1].endsWith('mocha')) {

    server.start(port => {
        console.log(`listening on port ${port}`);
    });

}
