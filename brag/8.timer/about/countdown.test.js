import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe('timers - Count down', () => {
    let page;
    beforeEach(async () => {
        page = new Page();
        const port = await server.start();
        await page.open(`http://localhost:${port}`);
        await eventually(page, async () => {
            assert.match(
                await page.section('Welcome'),
                /Start whenever you are ready/
            );
        });
    });
    afterEach(async () => {
        await page.close();
        await server.stop();
    });

    it('can be triggered', async () => {
        await page.click('Start');

        await eventually(page, async () => {
            assert.match(await page.section('Timer'), /Remaining 14s/);
            assert.doesNotMatch(await page.section('Timer'), /Done/);
        });
    });

    it('notifies when done', async () => {
        page.element('home-page').yoptimer = new page.window.YopTimer({
            delay: 50,
            count: 3,
        });
        await page.click('Start');

        await eventually(page, async () => {
            assert.match(await page.section('Timer'), /Remaining 0s/);
            assert.match(await page.section('Timer'), /Done/);
        });
    });
});
