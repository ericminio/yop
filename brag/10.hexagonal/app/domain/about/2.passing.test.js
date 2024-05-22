import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, play, eventBus } from './sut.js';

describe('passing', () => {
    beforeEach(async () => {
        state.ports = {
            nextChallenge: async () => ({
                question: '???',
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
        assert.equal(state.score, 0);
        await play('correct');
        assert.equal(state.score, 1);
    });

    it('calls for another question', async () => {
        state.score = 0;
        await play('correct');
        await play('correct');
        assert.equal(state.score, 1);
    });

    it('is shared', (_, done) => {
        eventBus.register(done, 'challenge passed');
        play('correct');
    });
});
