import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import { Page } from '../../../dist/testing/page-jsdom.js';
import { URL } from 'url';

describe('page jsdom', () => {
    let file = new URL('./page-index.html', import.meta.url);
    let page = new Page();

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
