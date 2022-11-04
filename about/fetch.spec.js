import { expect } from 'chai';
import { fetch, payload, Server } from '../lib/index.js';

describe('fetch', () => {

    let server;
    beforeEach(done => {
        server = new Server(5001, (incoming, response) => {
            payload(incoming).then(body => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    method: incoming.method,
                    url: incoming.url,
                    body,
                }));
            });
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

        expect(data).to.deep.equal({ method: 'GET', url: '/hello', body: '' });
    });

    it('can POST', async () => {
        const request = fetch(5001);
        const response = await request('/hello', { method: 'POST', body: 'hello world' });
        const data = await response.json();

        expect(data).to.deep.equal({ method: 'POST', url: '/hello', body: 'hello world' });
    });
});