import { expect } from 'chai';
import { page , eventually } from '../lib/index.js';
import { server } from './start.js';

describe('prime factors decomposition', () => {

    beforeEach(done => {
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

