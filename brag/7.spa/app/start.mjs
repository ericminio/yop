import {
    Router,
    Server,
    RouteDefault,
    contentOfFile,
    RouteAssetPrefix,
    RouteAssetEqual,
} from '../../../dist/index.js';
import { serveYop } from '../../../dist/spa/serve.js';
import { components } from './web/components.js';
import { template } from './web/template.js';

const home = () => ({
    content: contentOfFile(new URL('./web/index.html', import.meta.url)),
    contentType: 'text/html',
});

const router = new Router([
    {
        matches: (incoming) => incoming.url === '/yop-spa.js',
        go: serveYop(),
    },
    new RouteAssetEqual('/app.js', components),
    new RouteAssetPrefix('/template/', template),
    new RouteDefault(home),
]);

export const server = new Server(5001, router.handler.bind(router));

if (!process.argv[1].endsWith('mocha')) {
    server.start((port) => {
        console.log(`listening on port ${port}`);
    });
}
