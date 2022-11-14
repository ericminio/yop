import { expect } from 'chai';
import { page, eventually, request } from '../../lib/index.js';
import { clearSockets, server } from './start.mjs';

describe('websocket server', () => {

    let serverPort;
    beforeEach(done => {
        server.start(port => {
            clearSockets();
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
        await new Promise(resolve => setTimeout(resolve, 15));
        await request({
            host: 'localhost',
            port: serverPort,
            path: '/notify'
        });
        await eventually(() =>
            expect(page.section('Message')).to.contain('hello world')
        );
    });
});

