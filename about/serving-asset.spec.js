import { expect } from 'chai';
import { asset, request, Server } from '../lib/index.js';

describe('Serving asset handler', () => {

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
        server.use(asset('./about/serving-asset-index.html'));
        const home = {
            hostname: 'localhost',
            port: port,
            path: '/',
            method: 'GET'
        };
        let response = await request(home);

        expect(response.statusCode).to.equal(200);
        expect(response.headers['content-type']).to.equal('text/html');
        expect(response.body).to.contain('<title>serving html</title>');
    });
});