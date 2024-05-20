import {
    RouteAssetEqual,
    RouteYop,
    Router,
    Server,
    css,
    html,
    scripts,
} from '../../../../../../dist/index.js';

const router = new Router([
    new RouteAssetEqual('/', html(new URL('./sut.html', import.meta.url))),
    new RouteAssetEqual(
        '/sut.js',
        scripts(['../../../domain/domain.js', '../index.js'], import.meta.url)
    ),
    new RouteAssetEqual(
        '/templates/GameQuestion/index.html',
        html(new URL('../index.html', import.meta.url))
    ),
    new RouteAssetEqual(
        '/css/GameQuestion/index.css',
        css(new URL('../index.css', import.meta.url))
    ),
    new RouteYop(),
]);

export const server = new Server(router.handler.bind(router));
