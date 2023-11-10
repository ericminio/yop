import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { Page, eventually } from '../../../dist/index.js';

describe('async - prime factors decomposition', () => {
    let page;
    before(async () => {
        page = new Page();
        await page.open(new URL('../app/index.html', import.meta.url));
    });
    after(async () => {
        await page.close();
    });

    it('is available', async () => {
        await page.enter('Number to decompose', '8');
        await page.click('compute');

        await eventually(async () =>
            assert.match(await page.section('Results'), /2 x 2 x 2/)
        );
    });
});
