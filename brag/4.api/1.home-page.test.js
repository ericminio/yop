import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { page, eventually } from '../../dist/index.js';
import { server } from './start.mjs';

describe('api - home page', () => {
    beforeEach(async () => {
        const port = await server.start();
        await page.open(`http://localhost:${port}`);
    });
    afterEach(async () => {
        await page.close();
        await server.stop();
    });

    it('offers prime factors decomposition', async () => {
        page.set('Number to decompose').value = '42';
        page.click('compute');

        await eventually(() =>
            assert.match(page.section('Results'), /42 = 2 x 3 x 7/)
        );
    });
});
