import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { URL } from 'url';
import { Page } from '../../../dist/index.js';

describe('page - setting input via label', () => {
    const file = new URL('./page-inputs.html', import.meta.url);
    let page;

    before(async () => {
        page = new Page();
        await page.open(file);
    });
    after(async () => {
        await page.close();
    });

    it('works as expected', async () => {
        await page.enter('Number', '42');
        await page.click('Go');

        assert.match(await page.section('Happy path'), /42/);
    });

    it('informs of missing for attribute on label', async () => {
        try {
            await page.enter('Number for missing for', '42');
            fail();
        } catch (error) {
            assert.equal(
                error.message,
                "label with text 'Number for missing for' is missing for attribute"
            );
        }
    });

    it('informs of missing id attribute on input', async () => {
        try {
            await page.enter('Number for missing input id', '42');
        } catch (error) {
            assert.equal(
                error.message,
                "input with id 'input-with-missing-id' not found"
            );
        }
    });
});
