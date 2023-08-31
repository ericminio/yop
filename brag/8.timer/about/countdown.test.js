import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe('timers - Count down', () => {
    beforeEach(async () => {
        const port = await server.start();
        await page.open(`http://localhost:${port}`);
    });
    afterEach(async () => {
        await page.close();
        await server.stop();
    });

    it('can be triggered', async () => {
        await eventually(page, () => {
            assert.match(
                page.section('Welcome'),
                /Start whenever you are ready/
            );
        });
        page.click('Start');

        await eventually(page, () => {
            assert.match(page.section('Timer'), /Remaining 14s/);
            assert.doesNotMatch(page.section('Timer'), /Done/);
        });
    });

    it('notifies when done', async () => {
        await eventually(page, () => {
            assert.match(
                page.section('Welcome'),
                /Start whenever you are ready/
            );
        });
        page.document.yoptimer = new page.document.YopTimer({
            delay: 150,
            count: 3,
        });
        page.click('Start');

        await eventually(page, () => {
            assert.match(page.section('Timer'), /Remaining 0s/);
            assert.match(page.section('Timer'), /Done/);
        });
    });
});
