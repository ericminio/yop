import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { Page } from '../../dist/index.js';

describe('test audience - ux', () => {
    let page;
    before(async () => {
        page = new Page();
        await page.open(new URL('./index.html', import.meta.url));
    });
    after(async () => {
        await page.close();
    });

    it('gives focus to input field', async () => {
        assert.equal(
            await page.activeElementId(),
            await page.inputId('Number to decompose')
        );
    });

    it('displays an example', async () => {
        assert.equal(await page.inputValue('Number to decompose'), '42');
        assert.match(await page.section('Result'), /42 = 2 x 3 x 7/);
    });

    it('clears results on input', async () => {
        await page.enter('Number to decompose', '15');

        assert.equal(await page.section('Result'), 'Result');
    });
});
