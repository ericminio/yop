import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe('spa - Welcoming', () => {
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

    it('welcomes home', async () => {
        await eventually(async () => {
            assert.match(await page.section('Welcome Home'), /.*/);
        });
    });

    it('is home page', async () => {
        await eventually(async () => {
            assert.notEqual(await page.section('Welcome Home'), undefined);
        });
        assert.equal(await page.location(), `${baseUrl}/`);
    });

    it('offers options', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Menu'), /Home/);
            assert.match(await page.section('Menu'), /About/);
        });
    });
});
