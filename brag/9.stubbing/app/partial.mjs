import { Router, Server, contentOfFile, fail } from '../../../dist/index.js';
import { commonGuards } from './common-guards.js';

const router = new Router([
    ...commonGuards,
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
