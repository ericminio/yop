import {
    describe,
    test,
    before,
    after,
    beforeEach,
    afterEach,
} from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../dist/index.js';
import { server } from '../app/web/server.js';

describe('hot reload', () => {
    let page;
    let baseUrl;
    before(async () => {
        const port = await server.start();
        baseUrl = `http://localhost:${port}`;
    });
    after(async () => {
        await server.stop();
    });
    beforeEach(async () => {
        page = new Page();
        await page.open(baseUrl);
    });
    afterEach(async () => {
        await page.close();
    });

    test('is available on request', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Reload'), /Hello world/);
        });
    });
});
