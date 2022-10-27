import { expect } from 'chai';
import { page , eventually, Server, asset } from '../lib/index.js';

describe('prime factors decomposition', () => {

    let server;
    beforeEach(done => {
        server = new Server(5001, asset('./brag/index.html'));
        server.start(port => {
            page.open(`http://localhost:${port}`).then(done).catch(done);
        });
    });
    afterEach(done => {
        server.stop(done);
    });

    it('is available', async () => {
        page.set('number to decompose').value = '8';
        page.click('compute');

        await eventually(() => expect(page.section('results')).to.contain('2 x 2 x 2'));
    });
});

