import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe('timers - Home page', () => {
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

    it('offers to start', async () => {
        await eventually(page, () => {
            assert.match(
                page.section('Welcome'),
                /Start whenever you are ready/
            );
        });
        await eventually(page, () => {
            assert.match(page.section('Timer'), /Remaining 15s/);
        });
    });
});
