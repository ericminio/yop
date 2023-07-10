import { expect } from 'chai';
import { page, eventually, wait } from '../../dist/index.js';
import { clearRegistrations } from './notification-service.js';
import { server } from './start.mjs';

describe('websocket server', () => {
    let serverPort;
    let baseUrl;
    beforeEach((done) => {
        server.start((port) => {
            serverPort = port;
            baseUrl = `http://localhost:${port}`;
            clearRegistrations();
            page.open(`${baseUrl}/`).then(done).catch(done);
        });
    });
    afterEach((done) => {
        server.stop(done);
    });

    it('can upgrade an http connection to websocket', async () => {
        await eventually(() =>
            expect(page.section('Message')).to.contain('connected')
        );
    });

    it('can push data', async () => {
        await wait(15);
        await fetch(`${baseUrl}/notify`, {
            method: 'POST',
            body: JSON.stringify({
                event: 'greetings',
                message: 'hello world',
            }),
        });
        await eventually(() =>
            expect(page.section('Message')).to.contain('hello world')
        );
    });

    it('resists bad request', async () => {
        await wait(15);
        try {
            const response = await fetch(`${baseUrl}/notify`, {
                method: 'POST',
                body: JSON.stringify({ random: 'field' }),
            });
        } catch (error) {
            const { status } = JSON.parse(error.message);
            expect(status).to.equal(400);
        }
    });
});
