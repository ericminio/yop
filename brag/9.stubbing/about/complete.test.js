import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { stub } from '../app/complete.mjs';

describe('stubbing - complete', () => {
    let baseUrl;
    beforeEach(async () => {
        const port = await stub.start();
        baseUrl = `http://localhost:${port}`;
    });
    afterEach(async () => {
        await stub.stop();
    });

    it('serves expected json', async () => {
        process.env.YOP_STUB_FILE = './brag/9.stubbing/about/data/value.json';
        const response = await fetch(`${baseUrl}`);

        assert.equal(response.status, 200);
        assert.equal(response.headers.get('content-type'), 'application/json');
        assert.deepStrictEqual(await response.json(), { alive: true });
    });

    it('resists non-existing file', async () => {
        process.env.YOP_STUB_FILE = './brag/9.stubbing/about/data/unknown.json';
        const response = await fetch(`${baseUrl}`);

        assert.equal(response.status, 404);
        assert.equal(response.headers.get('content-type'), 'text/plain');
        assert.equal(await response.text(), 'NOT FOUND');
    });

    it('resists non-json file', async () => {
        process.env.YOP_STUB_FILE = './brag/9.stubbing/about/data/not-json.txt';
        const response = await fetch(`${baseUrl}`);

        assert.equal(response.status, 400);
        assert.equal(response.headers.get('content-type'), 'text/plain');
        assert.equal(await response.text(), `Not valid JSON`);
    });

    it('resists env file not set', async () => {
        delete process.env.YOP_STUB_FILE;
        const response = await fetch(`${baseUrl}`);

        assert.equal(response.status, 400);
        assert.equal(response.headers.get('content-type'), 'text/plain');
        assert.equal(
            await response.text(),
            'YOP_STUB_FILE env variable not set'
        );
    });
});
