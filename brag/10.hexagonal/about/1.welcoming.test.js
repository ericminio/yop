import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe('hexagonal - Welcoming', () => {
    let page;
    let baseUrl;
    before(async () => {
        page = new Page();
        const port = await server.start();
        baseUrl = `http://localhost:${port}`;
        await page.open(baseUrl);
    });
    after(async () => {
        await page.close();
        await server.stop();
    });

    it('is warm enough', async () => {
        await eventually(async () => {
            assert.match(await page.section('Welcome'), /.*/);
        });
    });
});
