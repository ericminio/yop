import { expect } from 'chai';
import { serving } from '../../../../dist/serving.js';
import { page } from '../../../../testing/page.js';
import { eventually } from '../../../../testing/eventually.js';
const server = serving('./lib/about/usage/app/index.html');

describe('power of twos', () => {

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

