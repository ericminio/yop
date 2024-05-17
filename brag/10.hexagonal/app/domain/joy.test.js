import { describe, test, before, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, setChallenge, play } from './sut.js';

describe('joy', () => {
    before(() => {
        setChallenge({
            question: 'What now?',
            choices: [
                { choice: 'Wrong', isCorrect: false },
                { choice: 'Correct', isCorrect: true },
            ],
        });
    });
    beforeEach(() => {
        state.score = 0;
    });

    test('comes for free', () => {
        play('Correct');
        assert.equal(state.score, 1);
        play('Correct');
        assert.equal(state.score, 2);
        play('Correct');
        assert.equal(state.score, 3);
    });
});
