import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { Page, eventually } from '../../../../../../dist/index.js';
import { serverForComponent } from '../../about/servers.js';

describe('GameQuestion', () => {
    const server = serverForComponent('game-question');
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
        page.window.setChallenge({
            question: 'What now?',
            choices: [
                { choice: 'wrong', isCorrect: false },
                { choice: 'correct', isCorrect: true },
            ],
        });

        await eventually(page, async () => {
            assert.match(await page.section('What now?'), /wrong*correct/);
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
