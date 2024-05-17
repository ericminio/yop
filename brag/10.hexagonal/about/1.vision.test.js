import { describe, test, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

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

    test('starting score is zero', async () => {
        await eventually(async () => {
            assert.match(await page.section('Score'), /0/);
        });
    });

    test('score increases when answering the question correctly', async () => {
        await page.executeScript((window) => {
            window.setChoices([{ choice: 'TDD', isCorrect: true }]);
        });
        page.click('TDD');

        await eventually(async () => {
            assert.match(await page.section('Score'), /1/);
        });
    });

    test('game over with wrong answer', async () => {
        await page.executeScript((window) => {
            window.setChoices([
                { choice: 'Waterfall', isCorrect: false },
                { choice: 'TDD', isCorrect: true },
            ]);
        });
        page.click('Waterfall');

        await eventually(async () => {
            assert.match(await page.section('Score'), /Game Over/);
        });
    });
});
