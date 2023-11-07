import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { serveAsset, eventually, Server } from '../dist/index.js';
import { Page } from '../dist/testing/page.js';
import { URL } from 'url';

describe('page jsdom', () => {
    let page;

    beforeEach(() => {
        page = new Page();
    });

    describe('opening file', () => {
        beforeEach(async () => {
            await page.open(new URL('./page-index.html', import.meta.url));
        });
        afterEach(async () => {
            await page.close();
        });

        it('works', async () => {
            assert.equal(await page.title(), 'well done page!');
        });
    });
});
