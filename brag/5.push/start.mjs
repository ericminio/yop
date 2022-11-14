import { encodeSingleFrameOfText, Router, Server, serveAssets, serveUpgrage, payload } from '../../lib/index.js';
import { decodeSingleFrameOfText } from '../../lib/websocket-frames.js';

let registrations = [];
export const clearRegistrations = () => registrations = [];

const socketDataListener = (socket, data) => {
    registrations.push({
        socket,
        events: JSON.parse(decodeSingleFrameOfText(data)).signup
    });
};

const notify = async (incoming, response) => {
    response.writeHead(200);
    response.end();

    const notification = JSON.parse(await payload(incoming));
    registrations
        .filter(r => r.events.includes(notification.event))
        .forEach(r => r.socket.write(encodeSingleFrameOfText(notification.message)));
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
