import {
    Router,
    Server,
    contentOfFile,
    fileExists,
} from '../../../dist/index.js';

const router = new Router([
    {
        matches: () => fileExists(process.env.YOP_STUB_FILE),
        go: (_, response) => {
            const answer = contentOfFile(process.env.YOP_STUB_FILE);
            response.writeHead(200, {
                'content-type': 'application/json',
                'content-length': answer.length,
            });
            response.end(answer);
        },
    },
    {
        matches: () => true,
        go: (_, response) => {
            const answer = 'NOT FOUND';
            response.writeHead(404, {
                'content-type': 'text/plain',
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
