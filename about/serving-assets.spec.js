import { expect } from 'chai';
import { serveAssets, request, Server } from '../lib/index.js';
import fs from 'fs';

describe('Serving assets handler', () => {

    let server;
    let port = 5001;
    beforeEach(done => {
        server = new Server(port);
        server.start(() => done());
    });
    afterEach(done => {
        server.stop(done);
    });

    it('can server html', async () => {
        server.use(serveAssets(new URL('.', import.meta.url)));
        const home = {
            hostname: 'localhost',
            port: port,
            path: '/serving-asset-index.html',
            method: 'GET'
        };
        let response = await request(home);

        expect(response.statusCode).to.equal(200);
        expect(response.headers['content-type']).to.equal('text/html');
        expect(response.body).to.contain('<title>serving html</title>');
    });

    it('defaults to 404', async () => {
        server.use(serveAssets(new URL('.', import.meta.url)));
        const home = {
            hostname: 'localhost',
            port: port,
            path: '/',
            method: 'GET'
        };
        let response = await request(home);

        expect(response.statusCode).to.equal(404);
        expect(response.headers['content-type']).to.equal('text/plain');
        expect(response.body).to.equal('NOT FOUND');
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
            const home = {
                hostname: 'localhost',
                port: port,
                path: '/',
                method: 'GET'
            };
            let response = await request(home);

            expect(response.statusCode).to.equal(200);
            expect(response.headers['content-type']).to.equal('text/html');
            expect(response.body).to.contain('<title>serving index.html</title>');
        });
    });

    it('can server javascript', async () => {
        server.use(serveAssets(new URL('.', import.meta.url)));
        const home = {
            hostname: 'localhost',
            port: port,
            path: '/serving-asset-code.js',
            method: 'GET'
        };
        let response = await request(home);

        expect(response.statusCode).to.equal(200);
        expect(response.headers['content-type']).to.equal('application/javascript');
        expect(response.body).to.equal('const sum = (a, b) => a + b');
    });

    it('can server css', async () => {
        server.use(serveAssets(new URL('.', import.meta.url)));
        const home = {
            hostname: 'localhost',
            port: port,
            path: '/serving-asset-css.css',
            method: 'GET'
        };
        let response = await request(home);

        expect(response.statusCode).to.equal(200);
        expect(response.headers['content-type']).to.equal('text/css');
        expect(response.body).to.equal('body {\n    color: green;\n}');
    });
});