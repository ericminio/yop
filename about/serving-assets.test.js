import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { serveAssets, Server } from '../dist/index.js';
import fs from 'fs';

describe('Serving assets handler', () => {
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
        server.use(serveAssets(new URL('.', import.meta.url)));
        const response = await fetch(`${baseUrl}/serving-asset-index.html`);

        assert.equal(response.status, 200);
        assert.equal(response.headers.get('content-type'), 'text/html');
        assert.match(await response.text(), /<title>serving html<\/title>/);
    });

    it('defaults to 404', async () => {
        server.use(serveAssets(new URL('.', import.meta.url)));
        const response = await fetch(`${baseUrl}/`);

        assert.equal(response.status, 404);
        assert.equal(response.headers.get('content-type'), 'text/plain');
        assert.equal(await response.text(), 'NOT FOUND');
    });

    describe('when index.html is present', () => {
        const file = new URL('./index.html', import.meta.url);

        beforeEach(() => {
            const html = `
                <!DOCTYPE html>
                <html lang="en">

                <head>
                    <title>serving index.html</title>
                </head>

                </html>`;
            fs.writeFileSync(file, html);
        });
        afterEach(() => {
            fs.unlinkSync(file);
        });

        it('defaults to index.html', async () => {
            server.use(serveAssets(new URL('.', import.meta.url)));
            const response = await fetch(`${baseUrl}/`);

            assert.equal(response.status, 200);
            assert.equal(response.headers.get('content-type'), 'text/html');
            assert.match(
                await response.text(),
                /<title>serving index.html<\/title>/
            );
        });
    });

    it('can server javascript', async () => {
        server.use(serveAssets(new URL('.', import.meta.url)));
        const response = await fetch(`${baseUrl}/serving-asset-code.js`);

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
        server.use(serveAssets(new URL('.', import.meta.url)));
        let response = await fetch(`${baseUrl}/serving-asset-css.css`);

        assert.equal(response.status, 200);
        assert.equal(response.headers.get('content-type'), 'text/css');
        assert.equal(
            (await response.text()).trim(),
            'body {\n    color: green;\n}'
        );
    });
});
