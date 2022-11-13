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
const serveChat = (incoming, response) => {
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
const servePong = (incoming, response) => {
    socket.write(encode('hello'));
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ data: 'pong sent' }));
}

const router = new Router([
    { matches: (incoming) => incoming.url === '/chat', go: serveChat },
    { matches: (incoming) => incoming.url === '/broadcast', go: servePong },
    { matches: () => true, go: serveAssets(new URL('.', import.meta.url)) },
]);

export const server = new Server(5001, router.handler.bind(router));

if (!process.argv[1].endsWith('mocha')) {

    server.start(port => {
        console.log(`listening on port ${port}`);
    });

}
