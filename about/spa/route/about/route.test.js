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
        await page.enter('Navigate to', '/about');
        await page.click('go');
        await eventually(page, async () => {
            assert.match(await page.section('About'), /We are magicians/);
        });
    });

    it('exposes searchParams as attribute', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Home'), /Welcome/);
        });
        await page.enter('Navigate to', '/search?criteria=shoes');
        await page.click('go');
        await eventually(page, async () => {
            assert.match(await page.section('Results'), /Criteria was: shoes/);
        });
    });

    it('exposes url segment variable as attribute', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Home'), /Welcome/);
        });
        await page.enter('Navigate to', '/product/42');
        await page.click('go');
        await eventually(page, async () => {
            assert.match(await page.section('Product'), /id: 42/);
        });
    });

    it('exposes several variables as attributes', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Home'), /Welcome/);
        });
        await page.enter('Navigate to', '/orders/42/items/15');
        await page.click('go');
        await eventually(page, async () => {
            assert.match(
                await page.section('Order item'),
                /order_id: 42.*item_id: 15/
            );
        });
    });
});
