import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { Page, eventually } from '../../../../../../dist/index.js';
import { server } from './serve-sut.js';

describe('GameQuestion', () => {
    let port;
    let page;
    before(async () => {
        page = new Page();
        port = await server.start();
    });
    after(async () => {
        await server.stop();
    });
    beforeEach(async () => {
        await page.open(`http://localhost:${port}`);
        await eventually(page, async () => {
            assert.match(await page.section('Question'), /wrong*correct/);
        });
    });
    afterEach(async () => {
        await page.close();
    });

    it('highlights correct answer after play', async () => {
        const correct = page.element('#choice-correct');
        assert.equal(correct.className, '');
        page.click('wrong');

        assert.match(correct.className, /bg-green-600/);
    });

    it('highlights wrong answer when played', async () => {
        const wrong = page.element('#choice-wrong');
        assert.equal(wrong.className, '');
        page.click('wrong');

        assert.match(wrong.className, /bg-orange-600/);
    });
});
