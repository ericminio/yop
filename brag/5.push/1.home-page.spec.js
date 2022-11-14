import { expect } from 'chai';
import { page, eventually, request, wait } from '../../lib/index.js';
import { clearRegistrations } from './notification-service.js';
import { server } from './start.mjs';

describe('websocket server', () => {

    let serverPort;
    beforeEach(done => {
        server.start(port => {
            clearRegistrations();
            serverPort = port;
            page.open(`http://localhost:${port}`).then(done).catch(done);
        });
    });
    afterEach(done => {
        server.stop(done);
    });

    it('can upgrade an http connection to websocket', async () => {
        await eventually(() =>
            expect(page.section('Message')).to.contain('connected')
        );
    });

    it('can push data', async () => {
        await wait(15);
        await request({
            host: 'localhost',
            port: serverPort,
            path: '/notify',
            method: 'POST',
            body: JSON.stringify({ event: 'greetings', message: 'hello world' })
        });
        await eventually(() =>
            expect(page.section('Message')).to.contain('hello world')
        );
    });
});

