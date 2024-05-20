import { describe, it, beforeEach } from 'node:test';
import { eventBus, state, nextChallenge, play } from './sut.js';
import { ChallengerStub } from './stubs.js';

describe('winning', () => {
    beforeEach(async () => {
        state.score = 0;
        state.ports = {
            nextChallenge: ((adapter) => adapter.nextChallenge.bind(adapter))(
                new ChallengerStub([
                    {
                        question: 'What now?',
                        choices: [
                            { choice: 'wrong', isCorrect: false },
                            { choice: 'correct', isCorrect: true },
                        ],
                    },
                ])
            ),
        };
        await nextChallenge();
    });

    it('happens when answering the last question', (_, done) => {
        eventBus.register(done, 'you win!');
        play('correct');
    });
});
