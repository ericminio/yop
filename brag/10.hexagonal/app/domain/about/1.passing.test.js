import { describe, it, before, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, play } from './sut.js';
import { SingleChallengeChallenger } from './stubs.js';

describe('passing', () => {
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

    it('makes the score increase', () => {
        play('correct');
        assert.equal(state.score, 1);
        play('correct');
        assert.equal(state.score, 2);
        play('correct');
        assert.equal(state.score, 3);
    });
});
