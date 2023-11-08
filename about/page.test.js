import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { Server, html, serveContent } from '../dist/index.js';
import { Page } from '../dist/testing/page.js';
import { URL } from 'url';

describe('page', () => {
    const file = new URL('./page-index.html', import.meta.url);
    let page;

    before(() => {
        page = new Page();
    });
    after(async () => {
        await page.close();
    });

    describe('opening file', () => {
        before(async () => {
            await page.open(file);
        });
        after(async () => {
            await page.close();
        });

        it('works', async () => {
            assert.equal(await page.title(), 'well done page!');
        });
    });

    describe('opening url', () => {
        let server;
        let baseUrl;

        before(async () => {
            server = new Server(serveContent(html(file)));
            const port = await server.start();
            baseUrl = `http://localhost:${port}`;
            await page.open(`${baseUrl}`);
        });
        after(async () => {
            await server.stop();
            await page.close();
        });

        it('works', async () => {
            assert.equal(await page.title(), 'well done page!');
        });
    });
});
