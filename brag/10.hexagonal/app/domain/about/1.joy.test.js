import { describe, test, before, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, play } from './sut.js';

describe('joy', () => {
    before(async () => {
        state.ports = {
            challenge: async () =>
                Promise.resolve({
                    question: 'What now?',
                    choices: [
                        { choice: 'wrong', isCorrect: false },
                        { choice: 'correct', isCorrect: true },
                    ],
                }),
        };
        await nextChallenge();
    });
    beforeEach(() => {
        state.score = 0;
    });

    test('comes for free', () => {
        play('correct');
        assert.equal(state.score, 1);
        play('correct');
        assert.equal(state.score, 2);
        play('correct');
        assert.equal(state.score, 3);
    });
});
