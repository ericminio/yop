import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { ChallengerFake } from './fake.js';

describe('ChallengerFake', () => {
    let stub;

    beforeEach(async () => {
        stub = new ChallengerFake([
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
    });

    it('cleans the provided challenges', () => {
        assert.deepStrictEqual(stub.challenges, [
            {
                question: 'What now?',
                choices: [{ choice: 'TDD' }, { choice: 'Waterfall' }],
                correctAnswer: 'TDD',
                isLast: false,
            },
            {
                question: 'First step?',
                choices: [
                    { choice: 'Test' },
                    { choice: 'Code' },
                    { choice: 'Refactor' },
                ],
                correctAnswer: 'Test',
                isLast: true,
            },
        ]);
    });

    it('provides challenges in expected order', async () => {
        const first = await stub.nextChallenge();
        assert.equal(first.question, 'What now?');
        const second = await stub.nextChallenge();
        assert.equal(second.question, 'First step?');
        const third = await stub.nextChallenge();
        assert.equal(third, undefined);
    });

    it('validates first answer as expected', async () => {
        assert.deepStrictEqual(
            await stub.validateAnswer({ answer: 'TDD', question: 'What now?' }),
            { isCorrect: true, correctAnswer: 'TDD' }
        );
        assert.deepStrictEqual(
            await stub.validateAnswer({
                answer: 'Waterfall',
                question: 'What now?',
            }),
            { isCorrect: false, correctAnswer: 'TDD' }
        );
    });

    it('validates second answer as expected', async () => {
        assert.deepStrictEqual(
            await stub.validateAnswer({
                answer: 'Test',
                question: 'First step?',
            }),
            { isCorrect: true, correctAnswer: 'Test' }
        );
    });
});
