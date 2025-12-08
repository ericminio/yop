import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { URL } from 'url';
import { Page } from '../../../dist/testing/index.js';

describe('page section selection', () => {
    let page;

    before(async () => {
        page = new Page();
        await page.open(new URL('./page-sections.html', import.meta.url));
    });
    after(async () => {
        await page.close();
    });

    it('selects by partial content', async () => {
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

    it('returns exact name match over smaller text', async () => {
        assert.match(await page.section('agree'), /agree strongly/);
    });

    it('throws when multiple sections with same name exist being the searched term', async () => {
        await assert.rejects(
            async () => {
                await page.section('results');
            },
            {
                message:
                    /multiple elements 'section' with name 'results' found/,
            }
        );
    });
});
