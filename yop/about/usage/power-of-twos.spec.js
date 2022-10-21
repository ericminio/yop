import { expect } from 'chai';
import { server } from './serving-index.js';
import { page } from '../../dist/page.js';

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
        page.enter('number to decompose').value = '42';
        page.click('compute');

        expect(page.content()).to.contain('2 x 3 x 7');
    });
});