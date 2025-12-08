import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { contentOfFile } from '../../../../../../dist/index.js';
import { Page, eventually } from '../../../../../../dist/testing/index.js';
import { domain } from '../../../domain/about/sut.js';

describe('GameNextChallengeInvite', () => {
    const content = `
        <!DOCTYPE html>
        <html>
            <head>
                <script>
                    ${domain}
                    ${contentOfFile(
                        './brag/10.hexagonal/app/web/GameNextChallengeInvite/index.js'
                    )}
                </script>
            </head>
            <body>
                <game-next-challenge-invite></game-next-challenge-invite>
            </body>
        </html>
    `;
    let page;
    const empty =
        '<game-next-challenge-invite>&nbsp;</game-next-challenge-invite>';
    const clean = (html) => html.replace(/\s\s+/g, ' ').trim();

    beforeEach(async () => {
        page = new Page();
        await page.open(content, {
            fetch: () =>
                Promise.resolve({
                    status: 200,
                    text: () =>
                        Promise.resolve(
                            contentOfFile(
                                './brag/10.hexagonal/app/web/GameNextChallengeInvite/index.html'
                            )
                        ),
                }),
        });
        page.window.state.ports = {
            nextChallenge: async () => ({
                question: 'What now?',
                choices: [{ choice: 'TDD' }, { choice: 'Waterfall' }],
            }),
            validateAnswer: async ({ answer }) => ({
                isCorrect: answer === 'TDD',
                correctAnswer: 'TDD',
            }),
        };
        await page.window.nextChallenge();

        await eventually(page, async () => {
            assert.equal(clean(await page.html()), empty);
        });
    });
    afterEach(async () => {
        await page.close();
    });

    it('is not displayed by default', async () => {
        await eventually(page, async () => {
            assert.equal(clean(await page.html()), empty);
        });
    });

    it('is not displayed when loosing', async () => {
        await page.window.play('Waterfall');

        await eventually(page, async () => {
            assert.equal(clean(await page.html()), empty);
        });
    });

    it('is displayed when passing challenge was not last', async () => {
        await page.window.play('TDD');

        await eventually(page, async () => {
            assert.match(await page.section('next challenge'), /.*/);
        });
    });

    it('is not displayed when passing challenge was last', async () => {
        page.window.setChallenge({
            question: 'What now?',
            choices: [{ choice: 'TDD' }, { choice: 'Waterfall' }],
            isLast: true,
        });
        await page.window.play('TDD');

        await eventually(page, async () => {
            assert.equal(clean(await page.html()), empty);
        });
    });
});
