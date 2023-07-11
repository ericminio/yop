import {
    Router,
    Server,
    RouteDefault,
    RouteAssetPrefix,
    RouteAssetEqual,
    yop,
    template,
    html,
} from '../../../dist/index.js';
import { components } from './web/components.js';

const router = new Router([
    new RouteAssetEqual('/yop.js', yop),
    new RouteAssetEqual('/app.js', components),
    new RouteAssetPrefix(
        '/template/',
        template(new URL('./web/components', import.meta.url))
    ),
    new RouteDefault(html(new URL('./web/index.html', import.meta.url))),
]);

export const server = new Server(5001, router.handler.bind(router));

if (!process.argv[1].endsWith('mocha')) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
