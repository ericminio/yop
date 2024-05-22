import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventBus, state, nextChallenge, play } from './sut.js';
import { ChallengerFake } from './fake.js';

describe('winning', () => {
    beforeEach(async () => {
        state.ports = new ChallengerFake([
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

    it('does not happen when answering the first question', async () => {
        let answer = '';
        const counting = () => {
            answer += state.challenge.chosenAnswer;
        };
        eventBus.register(counting, 'you win!');
        await nextChallenge();
        await play('TDD');
        await nextChallenge();
        await play('Test');

        assert.equal(answer, 'Test');
    });
});
