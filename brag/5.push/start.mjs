import { Router, Server, serveAssets, serveUpgrage } from '../../lib/index.js';
import { notify, socketDataListener } from './notification-service.js';

const router = new Router([
    {
        matches: (incoming) => incoming.url === '/connect',
        go: serveUpgrage(socketDataListener),
    },
    { matches: (incoming) => incoming.url === '/notify', go: notify },
    { matches: () => true, go: serveAssets(new URL('.', import.meta.url)) },
]);

export const server = new Server(5001, router.handler.bind(router));

if (!process.argv[1].endsWith('mocha')) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
