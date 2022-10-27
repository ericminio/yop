import { expect } from 'chai';
import { request, Server } from '../lib/index.js';
const port = 5005;

describe('Server', () => {

    let server;
    beforeEach(done => {
        server = new Server(port);
        server.start((p) => { done(); });
    });
    afterEach(done => {
        server.stop(done);
    });

    it('implements nothing by default', async () => {
        const home = {
            hostname: 'localhost',
            port: port,
            path: '/',
            method: 'GET'
        };
        let response = await request(home);
            
        expect(response.statusCode).to.equal(501);
    });
});