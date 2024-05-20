import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, play } from './sut.js';

describe('loosing', () => {
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

    it('is recorded', async () => {
        assert.equal(state.gameLost, false);
        await play('wrong');
        assert.equal(state.gameLost, true);
    });

    it('is a dead end', async () => {
        await play('wrong');
        assert.equal(state.score, 0);
        await play('correct');
        assert.equal(state.score, 0);
    });
});
