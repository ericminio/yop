import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { page } from '../../dist/index.js';

describe('test audience - ux', () => {
    beforeEach(async () => {
        await page.open(new URL('./index.html', import.meta.url));
    });

    it('gives focus to input field', () => {
        assert.equal(
            page.document.activeElement,
            page.input('Number to decompose')
        );
    });

    it('displays an example', () => {
        assert.equal(page.input('Number to decompose').value, '42');
        assert.match(page.section('Result'), /42 = 2 x 3 x 7/);
    });

    it('clears results on input', () => {
        page.enter('Number to decompose', '15');

        assert.equal(page.section('Result'), 'Result');
    });
});
