import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { URL } from 'url';
import { Page } from '../../../dist/index.js';

describe('page', () => {
    let page;

    before(async () => {
        page = new Page();
    });
    after(async () => {
        await page.close();
    });

    it('offers section selection', async () => {
        await page.open(new URL('./page-index.html', import.meta.url));

        assert.match(await page.section('Welcome'), /Hello world/);
    });

    it('selects first smallest section with matching content', async () => {
        await page.open(
            new URL('./page-nested-sections.html', import.meta.url)
        );
        const monday = await page.section('Monday');

        assert.match(monday, /Dentist/);
        assert.doesNotMatch(monday, /Shopping/);
    });
});
