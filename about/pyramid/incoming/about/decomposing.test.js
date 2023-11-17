import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { Page, eventually } from '../../../../dist/index.js';

describe('decomposing', () => {
    let page;
    before(async () => {
        page = new Page();
        await page.open(new URL('../app/index.html', import.meta.url));
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

    it('offers to clear the result placeholder', async () => {
        await page.enter('Number to decompose', '15');
        await page.click('compute');
        await page.click('clear');

        await eventually(async () =>
            assert.equal(await page.section('Result'), 'Result')
        );
    });
});
