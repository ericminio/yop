import {
    RouteAssetEqual,
    RouteCss,
    RouteDefault,
    RouteTemplate,
    RouteYop,
    Router,
    Server,
    html,
    scripts,
} from '../../../../dist/index.js';

const router = new Router([
    new RouteAssetEqual(
        '/app.js',
        scripts(
            [
                '../domain/domain.js',
                './HomePage/index.js',
                './GameMessage/index.js',
                './GameChallenge/index.js',
                './GameChoice/index.js',
                './GameScore/index.js',
                './GameNextChallengeInvite/index.js',
            ],
            import.meta.url
        )
    ),
    new RouteYop(),
    new RouteTemplate(/^\/templates\/(.*)/, new URL('.', import.meta.url)),
    new RouteCss(/^\/css\/(.*)/, new URL('.', import.meta.url)),
    new RouteDefault(html(new URL('./index.html', import.meta.url))),
]);

export const server = new Server(router.handler.bind(router));
