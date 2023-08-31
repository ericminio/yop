import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { page } from '../../dist/index.js';

describe('hello world - Greetings message', () => {
    beforeEach(async () => {
        await page.open(new URL('./index.html', import.meta.url));
    });

    it('is on Welcome page', () => {
        assert.equal(page.document.title, 'Welcome');
    });

    it('is displayed', () => {
        assert.match(page.section('Welcome home'), /Hello World!/);
    });
});
