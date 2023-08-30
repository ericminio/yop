import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe('Home page', () => {
    beforeEach(async () => {
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
