import { RouteDefault, Router, Server, html } from '../../../../dist/index.js';

const router = new Router([
    new RouteDefault(html(new URL('./ignore.html', import.meta.url))),
]);

export const server = new Server(router.handler.bind(router));
