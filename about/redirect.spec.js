import { expect } from 'chai';
import { redirect, request, Router, Server } from '../lib/index.js';

describe('redirection', () => {
    let server;
    let port = 5001;
    beforeEach((done) => {
        const router = new Router([
            {
                matches: (incoming) => incoming.url === '/redirect-please',
                go: redirect('/redirected'),
            },
            {
                matches: (incoming) => incoming.url === '/redirected',
                go: (incoming, response) => {
                    response.writeHead(200, { 'content-type': 'text/plain' });
                    response.end('after redirection');
                },
            },
        ]);
        server = new Server(port, router.handler.bind(router));
        server.start(() => {
            done();
        });
    });
    afterEach((done) => {
        server.stop(done);
    });

    it('works as expected', async () => {
        const home = {
            hostname: 'localhost',
            port: port,
            path: '/redirect-please',
            method: 'GET',
        };
        let response = await request(home);

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.equal('after redirection');
    });
});
