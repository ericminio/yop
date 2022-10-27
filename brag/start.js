import { asset, Server } from '../lib/index.js';

export const server = new Server(5001, asset('./brag/index.html'));

server.start((port) => {
    console.log(`listening on port ${port}`);
});
