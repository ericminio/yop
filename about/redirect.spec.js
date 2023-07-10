import { expect } from 'chai';
import { redirect, Router, Server } from '../dist/index.js';
const port = 5001;
const baseUrl = `http://localhost:${port}`;

describe('redirection', () => {
    let server;
    beforeEach((done) => {
        const router = new Router([
            {
                matches: (incoming) => incoming.url === '/redirect-please',
                go: redirect(`${baseUrl}/redirected`),
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
        const response = await fetch(`${baseUrl}/redirect-please`);

        expect(response.status).to.equal(200);
        expect(await response.text()).to.equal('after redirection');
    });
});
