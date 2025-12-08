import { contentOfFile, exposex } from '../../../../../dist/index.js';

const files = [
    './dist/spa/event-bus.js',
    './dist/spa/event-bus-new.js',
    './brag/10.hexagonal/app/domain/domain.js',
];

export const { eventBus, state, nextChallenge, play } = exposex({
    symbol: '{eventBus, state, nextChallenge, play}',
    files,
});

export const domain = files.reduce(
    (content, file) => content + contentOfFile(file),
    ''
);
