import { expect } from 'chai';
import { serving } from '../lib/serving.js';
import { page } from '../lib/page.js';
import { eventually } from '../lib/eventually.js';
const server = serving('./brag/index.html');

describe('prime factors decomposition', () => {

    beforeEach(done => {
        server.start(port => {
            page.open(`http://localhost:${port}`).finally(done);
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

