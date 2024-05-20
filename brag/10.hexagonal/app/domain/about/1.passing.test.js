import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, play } from './sut.js';

describe('passing', () => {
    beforeEach(async () => {
        state.score = 0;
        state.ports = {
            nextChallenge: async () => ({
                question: 'What now?',
                choices: [{ choice: 'wrong' }, { choice: 'correct' }],
            }),
            validateAnswer: async ({ answer }) => ({
                isCorrect: answer === 'correct',
                correctAnswer: 'correct',
            }),
        };
        await nextChallenge();
    });

    it('makes the score increase', async () => {
        await play('correct');
        assert.equal(state.score, 1);
    });

    it('calls for another question', async () => {
        await play('correct');
        await play('correct');
        assert.equal(state.score, 1);
    });
});
