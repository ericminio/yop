import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { Server, html, serveContent } from '../../../dist/index.js';
import { URL } from 'url';
import { Page } from '../../../dist/index.js';

describe('page opening url', () => {
    const file = new URL('./page-index.html', import.meta.url);
    let server;
    let baseUrl;
    let page;

    before(async () => {
        page = new Page();
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
