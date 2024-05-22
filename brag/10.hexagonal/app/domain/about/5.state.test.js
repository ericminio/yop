import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, play } from './sut.js';

describe('state', () => {
    beforeEach(async () => {
        state.score = 0;
        state.ports = {
            nextChallenge: async () => ({
                question: '???',
                choices: [{ choice: 'wrong' }, { choice: 'correct' }],
            }),
            validateAnswer: async () => ({
                isCorrect: true,
                correctAnswer: 'correct',
            }),
        };
        await nextChallenge();
    });

    it('keeps track of chosen answer', async () => {
        await play('anything');
        assert.equal(state.challenge.chosenAnswer, 'anything');
    });

    it('keeps track of correct answer', async () => {
        await play('anything');
        assert.equal(state.challenge.correctAnswer, 'correct');
    });
});
