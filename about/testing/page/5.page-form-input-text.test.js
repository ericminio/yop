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
});
