import { Router, Server, contentOfFile } from '../../../dist/index.js';

const router = new Router([
    {
        matches: () => true,
        go: async (_, response) => {
            const dataFromUpstream = await stub.upstreamAdapter.data();
            const dataFromFile = JSON.parse(
                contentOfFile(process.env.YOP_STUB_FILE)
            );
            const answer = JSON.stringify({
                ...dataFromUpstream,
                ...dataFromFile,
            });
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
