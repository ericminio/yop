import { serving } from "../lib/serving.js";
const server = serving('./lib/about/usage/app/index.html');

server.start((port) => {
    console.log(`listening on port ${port}`);
});