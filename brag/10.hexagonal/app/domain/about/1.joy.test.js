import { describe, test, before, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, play } from './sut.js';
import { SingleChallengeChallenger } from './stubs.js';

describe('joy', () => {
    before(async () => {
        state.ports = {
            challenge: ((adapter) => adapter.challenge.bind(adapter))(
                new SingleChallengeChallenger()
            ),
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
