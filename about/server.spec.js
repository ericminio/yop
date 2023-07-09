import { expect } from 'chai';
import { fetch, Server } from '../dist/index.js';
const port = 5005;

describe('Server', () => {
    let server;
    beforeEach((done) => {
        server = new Server(port);
        server.start(() => {
            done();
        });
    });
    afterEach((done) => {
        server.stop(done);
    });

    it('implements nothing by default', async () => {
        const response = await fetch(port)('/');

        expect(response.status).to.equal(501);
    });

    it('resists two calls of start', (done) => {
        server.start(() => {
            fetch(port)('/')
                .then((response) => {
                    expect(response.status).to.equal(501);
                    done();
                })
                .catch(done);
        });
    });
});
