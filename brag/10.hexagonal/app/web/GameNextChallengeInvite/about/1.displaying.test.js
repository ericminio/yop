import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { Page, eventually } from '../../../../../../dist/index.js';
import { serverForComponent } from '../../about/servers.js';

describe('GameNextChallengeInvite', () => {
    const server = serverForComponent('game-next-challenge-invite');
    let port;
    let page;
    const empty =
        '<game-next-challenge-invite>&nbsp;</game-next-challenge-invite>';
    const clean = (html) => html.replace(/\s\s+/g, ' ').trim();

    before(async () => {
        page = new Page();
        port = await server.start();
    });
    after(async () => {
        await server.stop();
    });
    beforeEach(async () => {
        await page.open(`http://localhost:${port}`);
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
