import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { Page, eventually } from '../../dist/index.js';

describe('test audience - home page', () => {
    let page;
    before(async () => {
        page = new Page();
        await page.open(new URL('./index.html', import.meta.url));
    });
    after(async () => {
        await page.close();
    });

    it('offers prime factors decomposition', async () => {
        await page.enter('Number to decompose', '15');
        await page.click('compute');

        await eventually(async () =>
            assert.match(await page.section('Result'), /15 = 3 x 5/)
        );
    });
});
