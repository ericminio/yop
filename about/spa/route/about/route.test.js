import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../../dist/testing/index.js';

import { server } from '../app/start.mjs';

describe('route', () => {
    let page;
    let baseUrl;
    beforeEach(async () => {
        page = new Page();
        const port = await server.start();
        baseUrl = `http://localhost:${port}`;
        await page.open(baseUrl);
    });
    afterEach(async () => {
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

    it('exposes searchParams as attribute', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Home'), /Welcome/);
        });
        await page.click('search');
        await eventually(page, async () => {
            assert.match(await page.section('Results'), /Criteria was: shoes/);
        });
    });

    it('exposes url segment variable as attribute', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Home'), /Welcome/);
        });
        await page.click('product');
        await eventually(page, async () => {
            assert.match(await page.section('Product'), /id: 42/);
        });
    });
});
