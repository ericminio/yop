import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, play } from './sut.js';
import { SingleChallengeChallenger } from './stubs.js';

describe('loosing', () => {
    beforeEach(async () => {
        state.score = 0;
        state.ports = {
            nextChallenge: ((adapter) => adapter.nextChallenge.bind(adapter))(
                new SingleChallengeChallenger()
            ),
        };
        await nextChallenge();
    });

    it('is a dead end', () => {
        play('wrong');
        assert.equal(state.score, 0);
        play('correct');
        assert.equal(state.score, 0);
    });
});
