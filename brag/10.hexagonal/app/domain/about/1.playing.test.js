import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { state, nextChallenge, eventBus } from './sut.js';

describe('playing', () => {
    beforeEach(async () => {
        state.ports = {
            nextChallenge: async () => ({
                question: '???',
                choices: [{ choice: 'wrong' }, { choice: 'correct' }],
            }),
        };
    });

    it('is eventually open', (_, done) => {
        eventBus.register(done, 'challenge set');
        nextChallenge();
    });
});
