import {
    RouteAssetEqual,
    RouteAssetPrefix,
    RouteYop,
    Router,
    Server,
    css,
    html,
    scripts,
} from '../../../../../../dist/index.js';
import { sutHtml } from '../../about/suts.js';

const router = new Router([
    new RouteAssetEqual('/', () => ({
        contentType: 'text/html',
        content: sutHtml('game-next-challenge-invite'),
    })),
    new RouteAssetEqual(
        '/sut.js',
        scripts(['../../../domain/domain.js', '../index.js'], import.meta.url)
    ),
    new RouteAssetPrefix(
        '/templates/',
        html(new URL('../index.html', import.meta.url))
    ),
    new RouteAssetPrefix(
        '/css/',
        css(new URL('../index.css', import.meta.url))
    ),
    new RouteYop(),
]);

export const server = new Server(router.handler.bind(router));
