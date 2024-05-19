import {
    describe,
    test,
    before,
    after,
    beforeEach,
    afterEach,
} from 'node:test';
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
    });
    after(async () => {
        await server.stop();
    });
    beforeEach(async () => {
        await page.open(baseUrl);
        await page.executeScript((window) => {
            window.state.ports = {
                challenge: async () =>
                    Promise.resolve({
                        question: 'What now?',
                        choices: [
                            { choice: 'TDD', isCorrect: true },
                            { choice: 'Waterfall', isCorrect: false },
                        ],
                    }),
            };
            void window.nextChallenge();
        });
        await eventually(page, async () => {
            assert.match(await page.section('What now?'), /TDD*Waterfall/);
        });
    });
    afterEach(async () => {
        await page.close();
    });

    test('starting score is zero', async () => {
        await eventually(page, async () => {
            assert.match(await page.section('Score'), /0/);
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

    test('you win when answering correctly the last question', async () => {
        page.click('TDD');
        await page.executeScript((window) => {
            window.state.ports = {
                challenge: async () =>
                    Promise.resolve({
                        question: 'First step?',
                        choices: [
                            { choice: 'Test', isCorrect: true },
                            { choice: 'Code', isCorrect: false },
                            { choice: 'Refactor', isCorrect: false },
                        ],
                        isLast: true,
                    }),
            };
            void window.nextChallenge();
        });
        await eventually(page, async () => {
            assert.match(
                await page.section('First step?'),
                /Test*Code*Refactor/
            );
        });
        page.click('Test');

        await eventually(page, async () => {
            assert.match(await page.section('You win! Congrats!!!'), /.*/);
        });
    });
});
