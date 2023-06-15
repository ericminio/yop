import { serveAssets, Router, Server } from '../../dist/index.js';
import { serveYop } from '../../dist/spa/serve.js';

const router = new Router([
    {
        matches: (incoming) => incoming.url === '/yop-spa.js',
        go: serveYop(),
    },
    {
        matches: () => true,
        go: serveAssets(new URL('.', import.meta.url)),
    },
]);

export const server = new Server(5001, router.handler.bind(router));

if (!process.argv[1].endsWith('mocha')) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
