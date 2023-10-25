import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { Page } from '../../dist/index.js';

describe('hello world - Greetings message', () => {
    let page;
    beforeEach(async () => {
        page = new Page();
        await page.open(new URL('./index.html', import.meta.url));
    });

    it('is on Welcome page', async () => {
        assert.equal(await page.title(), 'Welcome');
    });

    it('is displayed', async () => {
        assert.match(await page.section('Welcome home'), /Hello World!/);
    });
});
