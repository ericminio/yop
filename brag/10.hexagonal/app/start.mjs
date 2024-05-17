import {
    Router,
    Server,
    RouteDefault,
    RouteAssetEqual,
    html,
    scripts,
    RouteYop,
    RouteTemplate,
    RouteCss,
} from '../../../dist/index.js';

const router = new Router([
    new RouteAssetEqual(
        '/app.js',
        scripts(
            [
                './domain/domain.js',
                './web/HomePage/index.js',
                './web/GameQuestion/index.js',
                './web/GameScore/index.js',
            ],
            import.meta.url
        )
    ),
    new RouteYop(),
    new RouteTemplate(/^\/templates\/(.*)/, new URL('./web', import.meta.url)),
    new RouteCss(/^\/css\/(.*)/, new URL('./web', import.meta.url)),
    new RouteDefault(html(new URL('./web/index.html', import.meta.url))),
]);

export const server = new Server(router.handler.bind(router));

if (!process.argv[1].endsWith('test.js')) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
