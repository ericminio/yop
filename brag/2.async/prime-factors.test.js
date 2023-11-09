import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { Page, eventually } from '../../dist/index.js';

describe('async - prime factors decomposition', () => {
    let page;
    beforeEach(async () => {
        page = new Page();
        await page.open(new URL('./index.html', import.meta.url));
    });

    it('is available', async () => {
        page.enter('Number to decompose', '8');
        page.click('compute');

        await eventually(() =>
            assert.match(page.section('Results'), /2 x 2 x 2/)
        );
    });

    it('discloses waiting state immediately', async () => {
        page.enter('Number to decompose', '42');
        page.click('compute');

        assert.match(page.section('Results'), /waiting.../);
    });
});
