import { Router, Server, serveAssets, serveUpgrage } from '../../dist/index.js';
import { notify, socketDataListener } from './notification-service.js';

const router = new Router([
    {
        matches: (incoming) => incoming.url === '/connect',
        go: serveUpgrage(socketDataListener),
    },
    { matches: (incoming) => incoming.url === '/notify', go: notify },
    { matches: () => true, go: serveAssets(new URL('.', import.meta.url)) },
]);

export const server = new Server(router.handler.bind(router));

if (
    !process.argv[1].endsWith('mocha') &&
    !process.argv[1].endsWith('test.js')
) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
