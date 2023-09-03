import {
    Router,
    Server,
    contentOfFile,
    fail,
    fileExists,
} from '../../../dist/index.js';

const router = new Router([
    {
        matches: () => !process.env.YOP_STUB_FILE,
        go: fail(400, 'YOP_STUB_FILE env variable not set'),
    },
    {
        matches: () => !fileExists(process.env.YOP_STUB_FILE),
        go: fail(404, 'NOT FOUND'),
    },
    {
        matches: () => {
            try {
                JSON.parse(contentOfFile(process.env.YOP_STUB_FILE));
                return false;
            } catch (error) {
                return true;
            }
        },
        go: fail(400, 'Not valid JSON'),
    },
    {
        matches: () => !stub.upstreamData,
        go: fail(400, 'upstream data provider is missing'),
    },
    {
        matches: () => !stub.mergeStrategy,
        go: fail(400, 'merge strategy is missing'),
    },
    {
        matches: () => true,
        go: async (_, response) => {
            const dataFromFile = JSON.parse(
                contentOfFile(process.env.YOP_STUB_FILE)
            );
            const dataFromUpstream = await stub.upstreamData();
            const answer = JSON.stringify(
                stub.mergeStrategy(dataFromUpstream, dataFromFile)
            );
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
