import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { Page, eventually } from '../../../dist/index.js';

describe('decomposing', () => {
    let page;
    before(async () => {
        page = new Page();
        await page.open(new URL('../app/index.html', import.meta.url));
    });
    after(async () => {
        await page.close();
    });

    it('also works for 42', async () => {
        await page.enter('Number to decompose', '42');
        await page.click('compute');

        await eventually(async () =>
            assert.match(await page.section('Result'), /42 = 2 x 3 x 7/)
        );
    });
});
