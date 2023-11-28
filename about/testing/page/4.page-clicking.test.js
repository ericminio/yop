import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import { URL } from 'url';
import { Page, eventually } from '../../../dist/index.js';

describe('page - clicking on element', () => {
    const file = new URL('./page-buttons.html', import.meta.url);
    let page;

    before(async () => {
        page = new Page();
        await page.open(file);
    });
    after(async () => {
        await page.close();
    });

    it('is offered on button with partially matching label', async () => {
        page.click('great');

        await eventually(async () => {
            assert.equal(await page.section('Message'), 'Message great indeed');
        });
    });

    it('can click on a button with matching name', async () => {
        page.click('order');

        await eventually(async () => {
            assert.equal(await page.section('Message'), 'Message order in!');
        });
    });
});
