import { expect } from 'chai';
import { server } from './serving-index.js';
import { joe } from '../../testing/visitor.js';

describe('power of twos', () => {

    beforeEach(done => {
        server.start(port => {
            joe.open(`http://localhost:${port}`).finally(done);
        });
    });
    afterEach(done => {
        server.stop(done);
    });

    it('is available', () => {
        joe.enters('number to decompose').value = '42';
        joe.clicks('compute');

        expect(joe.amazement()).to.contain('2 x 3 x 7');
    });
});