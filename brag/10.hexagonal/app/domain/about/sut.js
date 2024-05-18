import { exposex } from '../../../../../dist/index.js';

export const { state, nextChallenge, play } = exposex({
    symbol: '{state, nextChallenge, play, gameOver}',
    files: [
        './dist/spa/event-bus.js',
        './brag/10.hexagonal/app/domain/domain.js',
    ],
});
