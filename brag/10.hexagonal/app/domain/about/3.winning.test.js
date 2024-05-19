import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventBus, state, nextChallenge, play } from './sut.js';
import { SingleChallengeChallenger } from './stubs.js';

describe('winning', () => {
    beforeEach(async () => {
        state.score = 0;
        state.ports = {
            nextChallenge: ((adapter) => adapter.nextChallenge.bind(adapter))(
                new SingleChallengeChallenger()
            ),
        };
        await nextChallenge();
    });

    it('happens when answering the last question', (_, done) => {
        eventBus.register(done, 'you win!');
        play('correct');
    });
});
