import { serveAssets, Router, Server } from '../../lib/index.js';
import { serveDecomposition } from './serve-decomposition.js';

const router = new Router([
    {
        matches: (incoming) => incoming.url.startsWith('/decompose'),
        go: serveDecomposition,
    },
    { matches: () => true, go: serveAssets(new URL('.', import.meta.url)) },
]);

export const server = new Server(5001, router.handler.bind(router));

if (!process.argv[1].endsWith('mocha')) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
