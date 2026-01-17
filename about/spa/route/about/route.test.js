import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../../dist/testing/index.js';

import { server } from '../app/start.mjs';

describe('route', () => {
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

    it('defaults to home page', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Home'), /Welcome/);
        });
    });

    it('allows navigation', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Home'), /Welcome/);
        });
        await page.click('about link');
        await eventually(page, async () => {
            assert.match(await page.section('About'), /We are magicians/);
        });
    });
});
