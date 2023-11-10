import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe('timers - Home page', () => {
    let page;
    before(async () => {
        page = new Page();
        const port = await server.start();
        await page.open(`http://localhost:${port}`);
    });
    after(async () => {
        await page.close();
        await server.stop();
    });

    it('offers to start', async () => {
        await eventually(page, async () => {
            assert.match(
                await page.section('Welcome'),
                /Start whenever you are ready/
            );
        });
        await eventually(page, async () => {
            assert.match(await page.section('Timer'), /Remaining 15s/);
        });
    });
});
