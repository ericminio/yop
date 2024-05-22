import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, play, eventBus } from './sut.js';

describe('failing', () => {
    beforeEach(async () => {
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

    it('is a dead end', async () => {
        await play('wrong');
        assert.equal(state.score, 0);
        await play('correct');
        assert.equal(state.score, 0);
    });

    it('is shared', (_, done) => {
        eventBus.register(done, 'challenge failed');
        play('wrong');
    });
});
