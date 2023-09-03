import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { stub } from '../app/partial.mjs';

describe('stubbing - partial', () => {
    let baseUrl;
    beforeEach(async () => {
        const port = await stub.start();
        baseUrl = `http://localhost:${port}`;
    });
    afterEach(async () => {
        await stub.stop();
    });

    it('applies provided merge strategy', async () => {
        process.env.YOP_STUB_FILE = './brag/9.stubbing/about/data/value.json';
        stub.upstreamData = async () => ({ field: 'anything', alive: false });
        stub.mergeStrategy = (dataFromUpstream, dataFromFile) => ({
            ...dataFromUpstream,
            ...dataFromFile,
        });
        const response = await fetch(`${baseUrl}`);

        assert.equal(response.status, 200);
        assert.equal(response.headers.get('content-type'), 'application/json');
        assert.deepStrictEqual(await response.json(), {
            field: 'anything',
            alive: true,
        });
    });
});
