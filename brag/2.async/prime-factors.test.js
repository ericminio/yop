import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { page, eventually } from '../../dist/index.js';

describe('async - prime factors decomposition', () => {
    beforeEach(async () => {
        await page.open(new URL('./index.html', import.meta.url));
    });

    it('is available', async () => {
        page.set('Number to decompose').value = '8';
        page.click('compute');

        await eventually(() =>
            assert.match(page.section('Results'), /2 x 2 x 2/)
        );
    });

    it('discloses waiting state immediately', async () => {
        page.set('Number to decompose').value = '42';
        page.click('compute');

        assert.match(page.section('Results'), /waiting.../);
    });
});
