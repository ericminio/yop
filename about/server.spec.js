import { expect } from 'chai';
import { Server } from '../dist/index.js';
const port = 5005;
const baseUrl = `http://localhost:${port}`;

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
        const response = await fetch(`${baseUrl}/`);

        expect(response.status).to.equal(501);
    });

    it('resists two calls of start', (done) => {
        server.start(() => {
            fetch(`${baseUrl}/`)
                .then((response) => {
                    expect(response.status).to.equal(501);
                    done();
                })
                .catch(done);
        });
    });
});
