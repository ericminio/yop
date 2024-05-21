import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { Page, eventually } from '../../../../../../dist/index.js';
import { serverForComponent } from '../../about/servers.js';

describe('GameChoice', () => {
    const server = serverForComponent(
        'GameChoice',
        `
        <game-choice choice="correct"></game-choice>
        <game-choice choice="wrong"></game-choice>
        `
    );
    const ports = {
        nextChallenge: async () => ({
            question: 'question?',
            choices: [{ choice: 'wrong' }, { choice: 'correct' }],
        }),
        validateAnswer: async ({ answer }) => ({
            isCorrect: answer === 'correct',
            correctAnswer: 'correct',
        }),
    };
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
        page.window.state.ports = ports;
        await page.window.nextChallenge();

        await eventually(page, async () => {
            assert.match(page.html(), /choice-correct/);
        });
    });
    afterEach(async () => {
        await page.close();
    });

    it('highlights correct answer after play', async () => {
        const correct = page.element('#choice-correct');
        assert.equal(correct.className, '');
        await page.window.play('correct');

        await eventually(page, async () => {
            assert.match(correct.className, /bg-green-600/);
        });
    });

    it('highlights wrong answer when played', async () => {
        const wrong = page.element('#choice-wrong');
        assert.equal(wrong.className, '');
        await page.window.play('wrong');

        await eventually(page, async () => {
            assert.match(wrong.className, /bg-orange-600/);
        });
    });

    it('highlights correct answer even when playing wrong', async () => {
        const correct = page.element('#choice-correct');
        assert.equal(correct.className, '');
        await page.window.play('wrong');

        await eventually(page, async () => {
            assert.match(correct.className, /bg-green-600/);
        });
    });
});
