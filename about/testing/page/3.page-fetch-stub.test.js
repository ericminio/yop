import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { URL } from 'url';
import { Page, eventually } from '../../../dist/index.js';

describe('page', () => {
    let page;

    before(async () => {
        page = new Page();
    });
    after(async () => {
        await page.close();
    });

    it('accepts fetch stub', async () => {
        let file = new URL('./page-stubbing-fetch.html', import.meta.url);
        await page.open(file, {
            fetch: () =>
                Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({ value: 'hello world' }),
                }),
        });

        await eventually(() => {
            assert.match(page.section('data'), /hello world/);
        });
    });
});
