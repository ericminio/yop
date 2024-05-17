import { describe, test, before, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { exposex } from '../../../../dist/index.js';
const { state, setChallenge, play } = exposex({
    symbol: '{state, setChallenge, play, gameOver}',
    files: [
        './dist/spa/event-bus.js',
        './brag/10.hexagonal/app/domain/domain.js',
    ],
});

describe('joy', () => {
    before(async () => {
        setChallenge({
            question: 'What now?',
            choices: [
                { choice: 'Wrong', isCorrect: false },
                { choice: 'Correct', isCorrect: true },
            ],
        });
    });
    beforeEach(async () => {
        state.score = 0;
    });

    test('comes for free', async () => {
        play('Correct');
        assert.equal(state.score, 1);
        play('Correct');
        assert.equal(state.score, 2);
        play('Correct');
        assert.equal(state.score, 3);
    });
});
