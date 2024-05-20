import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, play } from './sut.js';
import { ChallengerStub } from './stubs.js';

describe('loosing', () => {
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

    it('is recorded', () => {
        assert.equal(state.gameLost, false);
        play('wrong');
        assert.equal(state.gameLost, true);
    });

    it('is a dead end', () => {
        play('wrong');
        assert.equal(state.score, 0);
        play('correct');
        assert.equal(state.score, 0);
    });
});
