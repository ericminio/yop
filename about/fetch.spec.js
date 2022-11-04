import { expect } from 'chai';
import { fetch, Headers, payload, Server } from '../lib/index.js';

describe('fetch', () => {

    let server;
    beforeEach(done => {
        server = new Server(5001, async (incoming, response) => {
            const body = await payload(incoming);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({
                method: incoming.method,
                url: incoming.url,
                body,
                headers: incoming.headers
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

        expect(data).to.deep.equal({
            method: 'GET',
            url: '/hello',
            headers: {
                connection: 'close',
                host: 'localhost:5001',
            },
            body: ''
        });
    });

    it('can POST', async () => {
        const request = fetch(5001);
        const response = await request('/hello', { method: 'POST', body: 'hello world' });
        const data = await response.json();

        expect(data).to.deep.equal({
            method: 'POST',
            url: '/hello',
            headers: {
                connection: 'close',
                host: 'localhost:5001',
                'transfer-encoding': 'chunked',
            },
            body: 'hello world'
        });
    });

    it('propagates custom headers', async () => {
        const request = fetch(5001);
        const response = await request('/hello', {
            headers: new Headers({
                'x-one': 'I see you',
                'x-two': 'Me too',
            })
        });
        const data = await response.json();

        expect(data.headers).to.deep.equal({
            'x-one': 'I see you',
            'x-two': 'Me too',
            connection: 'close',
            host: 'localhost:5001'
        });
    });
});
