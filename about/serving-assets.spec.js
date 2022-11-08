import { expect } from 'chai';
import { serveAssets, request, Server } from '../lib/index.js';

describe('Serving assets handler', () => {

    let server;
    let port = 5001;
    beforeEach(done => {
        server = new Server(port);
        server.start(() => done());
    });
    afterEach(done => {
        server.stop(done);
    })

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