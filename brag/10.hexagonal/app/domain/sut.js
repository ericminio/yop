import { exposex } from '../../../../dist/index.js';

export const { state, setChallenge, play } = exposex({
    symbol: '{state, setChallenge, play, gameOver}',
    files: [
        './dist/spa/event-bus.js',
        './brag/10.hexagonal/app/domain/domain.js',
    ],
});
