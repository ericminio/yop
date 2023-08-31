import { serveAssets, Router, Server } from '../../dist/index.js';

const router = new Router([
    {
        matches: () => true,
        go: serveAssets(new URL('.', import.meta.url)),
    },
]);

export const server = new Server(5001, router.handler.bind(router));

if (
    !process.argv[1].endsWith('mocha') &&
    !process.argv[1].endsWith('test.js')
) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
