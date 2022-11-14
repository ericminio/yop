import { expect } from 'chai';
import { page, eventually, request } from '../../lib/index.js';
import { server } from './start.mjs';

describe.only('websocket server', () => {

    let serverPort;
    beforeEach(done => {
        server.start(port => {
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
        await request({
            host: 'localhost',
            port: serverPort,
            method: 'POST',
            path: '/broadcast'
        });
        await eventually(() =>
            expect(page.section('Message')).to.contain('hello world')
        );
    });
});

