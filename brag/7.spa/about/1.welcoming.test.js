import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe('spa - Welcoming', () => {
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

    it('welcomes home', async () => {
        await eventually(() => {
            assert.match(page.section('Welcome Home'), /.*/);
        });
    });

    it('is home page', async () => {
        await eventually(() => {
            assert.notEqual(page.section('Welcome Home'), undefined);
        });
        assert.equal(page.window.location.pathname, '/');
    });

    it('offers options', async () => {
        await eventually(page, () => {
            assert.match(page.section('Menu'), /Home/);
            assert.match(page.section('Menu'), /About/);
        });
    });
});
