import {
    Router,
    Server,
    RouteDefault,
    html,
    RouteYop,
} from '../../../../dist/index.js';

const router = new Router([
    new RouteYop(),
    new RouteDefault(html(new URL('./index.html', import.meta.url))),
]);

export const server = new Server(router.handler.bind(router));

if (!process.argv[1].endsWith('test.js')) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
