import {
    RouteAssetEqual,
    RouteAssetPrefix,
    RouteYop,
    Router,
    css,
    html,
    scripts,
} from '../../../../../dist/index.js';
import { sutHtml } from './suts.js';

export const routerForComponent = (componentClass, body) =>
    new Router([
        new RouteAssetEqual('/', () => ({
            contentType: 'text/html',
            content: sutHtml(body),
        })),
        new RouteAssetEqual(
            '/sut.js',
            scripts(
                ['../../domain/domain.js', `../${componentClass}/index.js`],
                import.meta.url
            )
        ),
        new RouteAssetPrefix(
            '/templates/',
            html(new URL(`../${componentClass}/index.html`, import.meta.url))
        ),
        new RouteAssetPrefix(
            '/css/',
            css(new URL(`../${componentClass}/index.css`, import.meta.url))
        ),
        new RouteYop(),
    ]);
