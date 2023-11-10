import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { URL } from 'url';
import { Page, eventually } from '../../../dist/index.js';

describe('page stubbing fetch', () => {
    const file = new URL('./page-stubbing-fetch.html', import.meta.url);
    let page;

    before(async () => {
        page = new Page();
    });
    after(async () => {
        await page.close();
    });

    it('is welcome', async () => {
        await page.open(file, {
            fetch: () =>
                Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({ value: 'hello world' }),
                }),
        });

        await eventually(async () => {
            assert.match(await page.section('data'), /hello world/);
        });
    });
});
