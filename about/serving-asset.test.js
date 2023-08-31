import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { serveAsset, Server, contentOfBinaryFile } from '../dist/index.js';

describe('Serving asset handler', () => {
    let server;
    let baseUrl;
    beforeEach(async () => {
        server = new Server();
        const port = await server.start();
        baseUrl = `http://localhost:${port}`;
    });
    afterEach(async () => {
        await server.stop();
    });

    it('can server html', async () => {
        server.use(
            serveAsset(new URL('./serving-asset-index.html', import.meta.url))
        );
        const response = await fetch(`${baseUrl}/`);

        assert.equal(response.status, 200);
        assert.equal(response.headers.get('content-type'), 'text/html');
        assert.equal(response.headers.get('cache-control'), 'max-age=45');
        assert.match(await response.text(), /<title>serving html<\/title>/);
    });

    it('can server javascript', async () => {
        server.use(
            serveAsset(new URL('./serving-asset-code.js', import.meta.url))
        );
        const response = await fetch(`${baseUrl}/`);

        assert.equal(response.status, 200);
        assert.equal(
            response.headers.get('content-type'),
            'application/javascript'
        );
        assert.equal(
            (await response.text()).trim(),
            'const sum = (a, b) => a + b;'
        );
    });

    it('can server css', async () => {
        server.use(
            serveAsset(new URL('./serving-asset-css.css', import.meta.url))
        );
        const response = await fetch(`${baseUrl}/`);

        assert.equal(response.status, 200);
        assert.equal(response.headers.get('content-type'), 'text/css');
        assert.equal(
            (await response.text()).trim(),
            'body {\n    color: green;\n}'
        );
    });

    it('can serve png', async () => {
        const image = new URL('./serving-asset-image.png', import.meta.url);
        const expected = Buffer.from(contentOfBinaryFile(image), 'binary');
        server.use(serveAsset(image));
        const response = await fetch(`${baseUrl}/`);

        assert.equal(response.status, 200);
        assert.equal(response.headers.get('content-type'), 'image/png');
        const actual = Buffer.from(await (await response.blob()).arrayBuffer());
        assert.ok(actual.equals(expected));
    });

    it('can serve jpg', async () => {
        const image = new URL('./serving-asset-image.jpg', import.meta.url);
        const expected = Buffer.from(contentOfBinaryFile(image), 'binary');
        server.use(serveAsset(image));
        const response = await fetch(`${baseUrl}/`);

        assert.equal(response.status, 200);
        assert.equal(response.headers.get('content-type'), 'image/jpeg');
        const actual = Buffer.from(await (await response.blob()).arrayBuffer());
        assert.ok(actual.equals(expected));
    });
});
