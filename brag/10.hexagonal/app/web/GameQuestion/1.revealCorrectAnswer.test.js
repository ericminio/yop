import { describe, it, before, after, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { server } from './sut.js';
import { Page, eventually } from '../../../../../dist/index.js';

describe('GameQuestion', () => {
    let page;
    before(async () => {
        page = new Page();
        const port = await server.start();
        await page.open(`http://localhost:${port}`);
    });
    after(async () => {
        await page.close();
        await server.stop();
    });
    beforeEach(async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Question'), /wrong*correct/);
        });
    });

    it('highlights correct answer after play', async () => {
        const choice = page.element('#choice-correct');
        assert.equal(choice.className, '');
        page.click('wrong');

        assert.match(choice.className, /bg-green-600/);
    });
});
