import { serveAsset, Router, Server } from '../../lib/index.js';
import { serveDecomposition } from './serve-decomposition.js';

const router = new Router([
    { matches: (incoming) => incoming.url.startsWith('/decompose'), go: serveDecomposition },
    { matches: () => true, go: serveAsset(new URL('./index.html', import.meta.url)) }
]);

export const server = new Server(5001, router.handler.bind(router));

if (!process.argv[1].endsWith('mocha')) {

    server.start(port => {
        console.log(`listening on port ${port}`);
    });

}
