import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import { eventually } from '../../../dist/index.js';
import { Page } from '../../../dist/testing/page-jsdom.js';
import { URL } from 'url';

describe('page jsdom', () => {
    let file = new URL('./page-index.html', import.meta.url);
    let page = new Page();

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

    it('needs a defined document', async () => {
        await page.open(file);
        page.document = undefined;
        try {
            page.find('anything');
        } catch (error) {
            assert.equal(error.message, 'page.document must be defined');
        }
    });

    it('needs a non-null document', async () => {
        await page.open(file);
        page.document = null;
        try {
            page.find('anything');
        } catch (error) {
            assert.equal(error.message, 'page.document must be defined');
        }
    });
});
