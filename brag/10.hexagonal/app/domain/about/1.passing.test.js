import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, play } from './sut.js';
import { SingleChallengeChallenger } from './stubs.js';

describe('passing', () => {
    beforeEach(async () => {
        state.score = 0;
        state.ports = {
            nextChallenge: ((adapter) => adapter.nextChallenge.bind(adapter))(
                new SingleChallengeChallenger()
            ),
        };
        await nextChallenge();
    });

    it('makes the score increase', () => {
        play('correct');
        assert.equal(state.score, 1);
    });

    it('calls for another question', () => {
        play('correct');
        play('correct');
        assert.equal(state.score, 1);
    });
});
