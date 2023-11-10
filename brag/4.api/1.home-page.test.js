import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { Page, eventually } from '../../dist/index.js';
import { server } from './start.mjs';

describe('api - home page', () => {
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

    it('offers prime factors decomposition', async () => {
        await page.enter('Number to decompose', '42');
        await page.click('compute');

        await eventually(async () =>
            assert.match(await page.section('Results'), /42 = 2 x 3 x 7/)
        );
    });
});
