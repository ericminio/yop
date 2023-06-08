import { expect } from 'chai';
import { page, eventually } from '../../dist/index.js';
import { server } from './start.mjs';

describe('home page', () => {
    beforeEach((done) => {
        server.start((port) => {
            page.open(`http://localhost:${port}`).then(done).catch(done);
        });
    });
    afterEach((done) => {
        server.stop(done);
    });

    it('offers prime factors decomposition', async () => {
        page.set('Number to decompose').value = '42';
        page.click('compute');

        await eventually(() =>
            expect(page.section('Results')).to.contain('42 = 2 x 3 x 7')
        );
    });
});
