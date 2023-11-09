import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { URL } from 'url';
import { Page } from '../../../dist/index.js';

describe('page', () => {
    let page;

    before(async () => {
        page = new Page();
        await page.open(new URL('./page-sections.html', import.meta.url));
    });
    after(async () => {
        await page.close();
    });

    it('offers section selection', async () => {
        assert.match(await page.section('Welcome'), /Hello world/);
    });

    it('selects first smallest section with matching content', async () => {
        const monday = await page.section('Monday');

        assert.match(monday, /Dentist/);
        assert.doesNotMatch(monday, /Shopping/);
    });

    it('returns section content as one line', async () => {
        assert.match(await page.section('Mouse'), /Quantity - 1 +/);
        assert.equal(
            await page.section('Monitor'),
            'Monitor Quantity - 2 + $ 300'
        );
    });
});
