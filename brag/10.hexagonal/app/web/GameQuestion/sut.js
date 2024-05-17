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
} from '../../../../../dist/index.js';

const router = new Router([
    new RouteAssetEqual(
        '/index.js',
        scripts(
            ['../../domain/domain.js', '../../web/GameQuestion/index.js'],
            import.meta.url
        )
    ),
    new RouteYop(),
    new RouteTemplate(
        /^\/templates\/(.*)/,
        new URL('../../web', import.meta.url)
    ),
    new RouteCss(/^\/css\/(.*)/, new URL('../../web', import.meta.url)),
    new RouteDefault(
        html(new URL('../../web/GameQuestion/sut.html', import.meta.url))
    ),
]);

export const server = new Server(router.handler.bind(router));
