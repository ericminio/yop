import {
    Router,
    Server,
    RouteDefault,
    RouteAssetPrefix,
    RouteAssetEqual,
    yop,
    template,
    html,
    scripts,
} from '../../../dist/index.js';

const router = new Router([
    new RouteAssetEqual('/yop.js', yop),
    new RouteAssetEqual(
        '/app.js',
        scripts(
            [
                './web/About/index.js',
                './web/MainMenu/index.js',
                './web/WelcomeHome/index.js',
            ],
            import.meta.url
        )
    ),
    new RouteAssetPrefix(
        '/template/',
        template(new URL('./web', import.meta.url))
    ),
    new RouteDefault(html(new URL('./web/index.html', import.meta.url))),
]);

export const server = new Server(5001, router.handler.bind(router));

if (!process.argv[1].endsWith('mocha')) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
