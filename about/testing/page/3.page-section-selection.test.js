import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { URL } from 'url';
import { Page } from '../../../dist/index.js';

describe('page', () => {
    const file = new URL('./page-index.html', import.meta.url);
    let page;

    before(async () => {
        page = new Page();
        await page.open(file);
    });
    after(async () => {
        await page.close();
    });

    it('offers section selection', async () => {
        assert.match(await page.section('Welcome'), /Hello world/);
    });
});
