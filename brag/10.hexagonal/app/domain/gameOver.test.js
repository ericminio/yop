import { describe, test, before, after, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { exposex } from '../../../../dist/index.js';
const { state, setChallenge, play } = exposex({
    symbol: '{state, setChallenge, play, gameOver}',
    files: [
        './dist/spa/event-bus.js',
        './brag/10.hexagonal/app/domain/domain.js',
    ],
});

describe('game over', () => {
    before(async () => {});
    after(async () => {});
    beforeEach(async () => {});

    test('can not play when the game is over', async () => {
        assert.equal(state.score, 0);
        setChallenge({
            question: 'What now?',
            choices: [
                { choice: 'Wrong', isCorrect: false },
                { choice: 'Correct', isCorrect: true },
            ],
        });
        play('Correct');
        assert.equal(state.score, 1);
        play('Correct');
        assert.equal(state.score, 2);
        play('Wrong');
        play('Correct');
        assert.equal(state.score, 2);
    });
});
