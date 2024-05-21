import { describe, it, beforeEach } from 'node:test';
import { eventBus, state, nextChallenge, play } from './sut.js';
import { eventually } from '../../../../../dist/index.js';

describe('winning', () => {
    beforeEach(async () => {
        state.score = 0;
        state.ports = {
            nextChallenge: async () => ({
                question: 'What now?',
                choices: [{ choice: 'wrong' }, { choice: 'correct' }],
                isLast: true,
            }),
            validateAnswer: async ({ answer }) => ({
                isCorrect: answer === 'correct',
                correctAnswer: 'correct',
            }),
        };
        await nextChallenge();
    });

    it('happens when answering the last question', (_, done) => {
        eventBus.register(done, 'you win!');
        play('correct');
    });
});
