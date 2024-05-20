import {
    RouteAssetEqual,
    RouteAssetPrefix,
    RouteYop,
    Router,
    css,
    html,
    scripts,
} from '../../../../../dist/index.js';
import { dashCaseToPascalCase } from './dashCaseToPascalCase.js';
import { sutHtml } from './suts.js';

export const routerForComponent = (tag) =>
    new Router([
        new RouteAssetEqual('/', () => ({
            contentType: 'text/html',
            content: sutHtml(tag),
        })),
        new RouteAssetEqual(
            '/sut.js',
            scripts(
                [
                    '../../domain/domain.js',
                    `../${dashCaseToPascalCase(tag)}/index.js`,
                ],
                import.meta.url
            )
        ),
        new RouteAssetPrefix(
            '/templates/',
            html(
                new URL(
                    `../${dashCaseToPascalCase(tag)}/index.html`,
                    import.meta.url
                )
            )
        ),
        new RouteAssetPrefix(
            '/css/',
            css(
                new URL(
                    `../${dashCaseToPascalCase(tag)}/index.css`,
                    import.meta.url
                )
            )
        ),
        new RouteYop(),
    ]);
