import { describe, test, before, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, setChallenge, play } from './sut.js';

describe('game over', () => {
    before(() => {
        setChallenge({
            question: 'Maybe',
            choices: [
                { choice: 'Wrong', isCorrect: false },
                { choice: 'Correct', isCorrect: true },
            ],
        });
    });
    beforeEach(() => {
        state.score = 0;
    });

    test('needs a deep restart', () => {
        play('Wrong');
        assert.equal(state.score, 0);
        play('Correct');
        assert.equal(state.score, 0);
    });
});
