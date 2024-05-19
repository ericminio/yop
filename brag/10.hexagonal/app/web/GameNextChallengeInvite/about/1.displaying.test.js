import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { Page, eventually } from '../../../../../../dist/index.js';
import { server } from './serve-sut.js';

describe('GameNextChallengeInvite', () => {
    const empty =
        '<game-next-challenge-invite>&nbsp;</game-next-challenge-invite>';
    const reduced = (html) => html.replace(/\s\s+/g, ' ').trim();
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
        await page.executeScript((window) => {
            window.setChallenge({
                question: 'What now?',
                choices: [
                    { choice: 'TDD', isCorrect: true },
                    { choice: 'Waterfall', isCorrect: false },
                ],
            });
        });
        await eventually(page, async () => {
            assert.equal(reduced(await page.html()), empty);
        });
    });
    afterEach(async () => {
        await page.close();
    });

    it('is not displayed by default', async () => {
        await eventually(page, async () => {
            assert.equal(reduced(await page.html()), empty);
        });
    });

    it('is not displayed when loosing', async () => {
        await page.executeScript((window) => {
            window.play('Waterfall');
        });
        await eventually(page, async () => {
            assert.equal(reduced(await page.html()), empty);
        });
    });

    it('is displayed when passing challenge was not last', async () => {
        await page.executeScript((window) => {
            window.play('TDD');
        });
        await eventually(page, async () => {
            assert.match(await page.section('next challenge'), /.*/);
        });
    });

    it('is not displayed when passing challenge was last', async () => {
        await page.executeScript((window) => {
            window.setChallenge({
                question: 'What now?',
                choices: [
                    { choice: 'TDD', isCorrect: true },
                    { choice: 'Waterfall', isCorrect: false },
                ],
                isLast: true,
            });
            window.play('TDD');
        });
        await eventually(page, async () => {
            assert.equal(reduced(await page.html()), empty);
        });
    });
});
