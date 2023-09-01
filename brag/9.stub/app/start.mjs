import { Router, RouterLog, Server } from '../../../dist/index.js';

const router = new Router([
    new RouterLog(),
    {
        matches: () => true,
        go: (_, response) => {
            const answer = JSON.stringify({ alive: true });
            response.writeHead(200, {
                'content-type': 'application/json',
                'content-length': answer.length,
            });
            response.end(answer);
        },
    },
]);

export const server = new Server(router.handler.bind(router));

if (!process.argv[1].endsWith('test.js')) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
