import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe('spa - Navigating', () => {
    let page;
    beforeEach(async () => {
        page = new Page();
        const port = await server.start();
        await page.open(`http://localhost:${port}`);
    });
    afterEach(async () => {
        await page.close();
        await server.stop();
    });

    it('leads elsewhere', async () => {
        await eventually(() => {
            assert.match(page.section('Menu'), /About/);
        });
        page.click('About');
        await eventually(() => {
            assert.match(page.section('About page'), /this is the about page/);
            assert.doesNotMatch(page.document.body.textContent, /Welcome Home/);
        });
        assert.equal(page.window.location.pathname, '/about');
    });
});
