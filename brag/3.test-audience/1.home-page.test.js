import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { page, eventually } from '../../dist/index.js';

describe('test audience - home page', () => {
    beforeEach(async () => {
        await page.open(new URL('./index.html', import.meta.url));
    });

    it('offers prime factors decomposition', async () => {
        page.set('Number to decompose').value = '15';
        page.click('compute');

        await eventually(() =>
            assert.match(page.section('Result'), /15 = 3 x 5/)
        );
    });
});
