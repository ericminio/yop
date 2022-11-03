import { expect } from 'chai';
import { fetch, Server } from '../lib/index.js';

describe('fetch', () => {

    let server;
    beforeEach(done => {
        server = new Server(5001, (incoming, response) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({
                method: incoming.method,
                url: incoming.url
            }));
        });
        server.start(() => done());
    });
    afterEach(done => {
        server.stop(done);
    });

    it('can GET', async () => {
        const request = fetch(5001);
        const response = await request('/hello');
        const data = await response.json();

        expect(data).to.deep.equal({ method: 'GET', url: '/hello' });
    });
});