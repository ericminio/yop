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
import { ChallengerFake } from '../app/domain/about/fake.js';

describe('hexagonal - vision', () => {
    let page;
    let baseUrl;
    before(async () => {
        const port = await server.start();
        baseUrl = `http://localhost:${port}`;
    });
    after(async () => {
        await server.stop();
    });
    beforeEach(async () => {
        page = new Page();
        await page.open(baseUrl);
        const fake = new ChallengerFake([
            {
                question: 'What now?',
                choices: [{ choice: 'TDD' }, { choice: 'Waterfall' }],
                correctAnswer: 'TDD',
            },
            {
                question: 'First step?',
                choices: [
                    { choice: 'Test' },
                    { choice: 'Code' },
                    { choice: 'Refactor' },
                ],
                correctAnswer: 'Test',
            },
        ]);
        page.window.state.ports = fake;
        page.window.nextChallenge();

        await eventually(page, async () => {
            assert.match(await page.section('What now?'), /TDD.*\s*Waterfall/);
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

    test('game is lost with wrong answer', async () => {
        page.click('Waterfall');

        await eventually(page, async () => {
            assert.match(await page.section('Game Over'), /.*/);
        });
    });

    test('game is won when answering correctly the last question', async () => {
        page.click('TDD');
        await eventually(page, async () => {
            assert.match(await page.section('next challenge'), /.*/);
        });
        page.click('next challenge');
        await eventually(page, async () => {
            assert.match(
                await page.section('First step?'),
                /Test.*\sCode.*\sRefactor/
            );
        });
        page.click('Test');

        await eventually(page, async () => {
            assert.match(await page.section('You win! Congrats!!!'), /.*/);
        });
    });
});
