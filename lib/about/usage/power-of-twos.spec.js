import { expect } from 'chai';
import { server } from './serving-index.js';
import { page } from '../../testing/page.js';

describe('power of twos', () => {

    beforeEach(done => {
        server.start(port => {
            page.open(`http://localhost:${port}`).finally(done);
        });
    });
    afterEach(done => {
        server.stop(done);
    });

    it('is available', () => {
        page.set('number to decompose').value = '8';
        page.click('compute');

        expect(page.section('results')).to.contain('2 x 2 x 2');
    });
});