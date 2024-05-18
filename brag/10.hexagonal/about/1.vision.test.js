import { describe, test, before, after, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../dist/index.js';
import { server } from '../app/web/server.js';

describe('hexagonal - vision', () => {
    let page;
    let baseUrl;
    before(async () => {
        page = new Page();
        const port = await server.start();
        baseUrl = `http://localhost:${port}`;
        await page.open(baseUrl);
    });
    after(async () => {
        await page.close();
        await server.stop();
    });
    beforeEach(async () => {
        await page.executeScript((window) => {
            window.state.ports = {
                challenge: async () =>
                    Promise.resolve({
                        question: 'What now?',
                        choices: [
                            { choice: 'Waterfall', isCorrect: false },
                            { choice: 'TDD', isCorrect: true },
                        ],
                    }),
            };
            void window.nextChallenge();
        });
    });

    test('starting score is zero', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Score'), /0/);
        });
    });

    test('the choices are presented', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('What now?'), /Waterfall*TDD/);
        });
    });

    test('score increases when answering the question correctly', async () => {
        page.click('TDD');

        await eventually(page, async () => {
            assert.match(await page.section('Score'), /1/);
        });
    });

    test('game over with wrong answer', async () => {
        page.click('Waterfall');

        await eventually(page, async () => {
            assert.match(await page.section('Game Over'), /.*/);
        });
    });
});
