import {
    RouteAssetEqual,
    RouteYop,
    Router,
    Server,
    css,
    html,
    scripts,
} from '../../../../../dist/index.js';

const router = new Router([
    new RouteAssetEqual(
        '/',
        html(new URL('../../web/GameQuestion/sut.html', import.meta.url))
    ),
    new RouteYop(),
    new RouteAssetEqual(
        '/index.js',
        scripts(
            ['../../domain/domain.js', '../../web/GameQuestion/index.js'],
            import.meta.url
        )
    ),
    new RouteAssetEqual(
        '/templates/GameQuestion/index.html',
        html(new URL('../../web/GameQuestion/index.html', import.meta.url))
    ),
    new RouteAssetEqual(
        '/css/GameQuestion/index.css',
        css(new URL('../../web/GameQuestion/index.css', import.meta.url))
    ),
]);

export const server = new Server(router.handler.bind(router));
