import { Router, Server, contentOfFile } from '../../../dist/index.js';
import { commonGuards } from './common.js';

const router = new Router([
    ...commonGuards,
    {
        matches: () => true,
        go: (_, response) => {
            const answer = contentOfFile(process.env.YOP_STUB_FILE);
            response.writeHead(200, {
                'content-type': 'application/json',
                'content-length': answer.length,
            });
            response.end(answer);
        },
    },
]);

export const stub = new Server(router.handler.bind(router));

if (!process.argv[1].endsWith('test.js')) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
