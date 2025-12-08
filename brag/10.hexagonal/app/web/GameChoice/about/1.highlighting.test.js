import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { Page, eventually } from '../../../../../../dist/testing/index.js';
import { contentOfFile } from '../../../../../../dist/index.js';
import { domain } from '../../../domain/about/sut.js';

describe('GameChoice', () => {
    const content = `
        <!DOCTYPE html>
        <html>
            <head>
                <script>
                    ${domain}
                    ${contentOfFile(
                        './brag/10.hexagonal/app/web/GameChoice/index.js'
                    )}
                </script>
            </head>
            <body>
                <game-choice choice="correct"></game-choice>
                <game-choice choice="very wrong"></game-choice>
                <game-choice choice="neutral"></game-choice>
            </body>
        </html>
    `;
    const ports = {
        nextChallenge: async () => ({
            question: 'question?',
            choices: [
                { choice: 'very wrong' },
                { choice: 'correct' },
                { choice: 'neutral' },
            ],
        }),
        validateAnswer: async ({ answer }) => ({
            isCorrect: answer === 'correct',
            correctAnswer: 'correct',
        }),
    };
    let page;

    beforeEach(async () => {
        page = new Page();
        await page.open(content, {
            fetch: () =>
                Promise.resolve({
                    status: 200,
                    text: () =>
                        Promise.resolve(
                            contentOfFile(
                                './brag/10.hexagonal/app/web/GameChoice/index.html'
                            )
                        ),
                }),
        });
        page.window.state.ports = ports;
        await page.window.nextChallenge();

        await eventually(page, async () => {
            assert.match(page.html(), /choice-neutral/);
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
        const wrong = page.element('#choice-very-wrong');
        assert.equal(wrong.className, '');
        await page.window.play('very wrong');

        await eventually(page, async () => {
            assert.match(wrong.className, /bg-orange-600/);
        });
    });

    it('highlights correct answer even when playing wrong', async () => {
        const correct = page.element('#choice-correct');
        assert.equal(correct.className, '');
        await page.window.play('very wrong');

        await eventually(page, async () => {
            assert.match(correct.className, /bg-green-600/);
        });
    });

    it('stays not highlighted if not played and wrong answer', async () => {
        const correct = page.element('#choice-neutral');
        assert.equal(correct.className, '');
        await page.window.play('correct');

        await eventually(page, async () => {
            assert.equal(correct.className, '');
        });
    });
});
