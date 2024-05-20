import { exposex } from '../../../../../dist/index.js';

export const { eventBus, state, nextChallenge, play } = exposex({
    symbol: '{eventBus, state, nextChallenge, play}',
    files: [
        './dist/spa/event-bus.js',
        './brag/10.hexagonal/app/domain/domain.js',
    ],
});
