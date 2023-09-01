import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { server } from '../app/start.mjs';

describe('stub', () => {
    let baseUrl;
    beforeEach(async () => {
        const port = await server.start();
        baseUrl = `http://localhost:${port}`;
    });
    afterEach(async () => {
        await server.stop();
    });

    it('serves expected json', async () => {
        process.env.YOP_STUB_FILE = './brag/9.stub/about/data/value.json';
        const response = await fetch(`${baseUrl}`);

        assert.equal(response.status, 200);
        assert.equal(response.headers.get('content-type'), 'application/json');
        assert.deepStrictEqual(await response.json(), { alive: true });
    });

    it('resists non-existing file', async () => {
        process.env.YOP_STUB_FILE = './brag/9.stub/about/data/unknown.json';
        const response = await fetch(`${baseUrl}`);

        assert.equal(response.status, 404);
        assert.equal(response.headers.get('content-type'), 'text/plain');
        assert.equal(await response.text(), 'NOT FOUND');
    });
});
