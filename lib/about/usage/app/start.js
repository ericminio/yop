import { server } from "../serving-index.js";

server.start((port) => {
    console.log(`listening on port ${port}`);
});