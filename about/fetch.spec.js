import { expect } from 'chai';
import { fetch, Headers, payload, Server } from '../dist/index.js';
const port = 5001;
const baseUrl = `http://localhost:${port}`;

describe('fetch', () => {
    let server;
    beforeEach((done) => {
        server = new Server(5001, async (incoming, response) => {
            const body = await payload(incoming);
            response.end(
                JSON.stringify({
                    method: incoming.method,
                    url: incoming.url,
                    body,
                    headers: incoming.headers,
                })
            );
        });
        server.start(() => done());
    });
    afterEach((done) => {
        server.stop(done);
    });

    it('can GET', async () => {
        const response = await fetch(`${baseUrl}/hello`);
        const data = await response.json();

        expect(data).to.deep.equal({
            method: 'GET',
            url: '/hello',
            headers: {
                connection: 'close',
                host: 'localhost:5001',
            },
            body: '',
        });
    });

    it('can POST', async () => {
        const response = await fetch(`${baseUrl}/hello`, {
            method: 'POST',
            body: 'hello world',
        });
        const data = await response.json();

        expect(data).to.deep.equal({
            method: 'POST',
            url: '/hello',
            headers: {
                connection: 'close',
                host: 'localhost:5001',
                'transfer-encoding': 'chunked',
            },
            body: 'hello world',
        });
    });

    it('propagates custom headers', async () => {
        const response = await fetch(`${baseUrl}/hello`, {
            headers: new Headers({
                'x-one': 'I see you',
                'x-two': 'Me too',
            }),
        });
        const data = await response.json();

        expect(data.headers).to.deep.equal({
            'x-one': 'I see you',
            'x-two': 'Me too',
            connection: 'close',
            host: 'localhost:5001',
        });
    });

    it('can GET text body', async () => {
        const response = await fetch(`${baseUrl}/text`);
        const data = await response.text();

        expect(JSON.parse(data)).to.deep.equal({
            method: 'GET',
            url: '/text',
            headers: {
                connection: 'close',
                host: 'localhost:5001',
            },
            body: '',
        });
    });
});
