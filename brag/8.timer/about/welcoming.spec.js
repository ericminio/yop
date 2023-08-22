import { expect } from 'chai';
import { eventually, page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe.only('Home page', () => {
    beforeEach((done) => {
        server.start((port) => {
            page.open(`http://localhost:${port}`).then(done).catch(done);
        });
    });
    afterEach((done) => {
        server.stop(done);
    });

    it('offers to start', async () => {
        await eventually(page, () => {
            expect(page.section('Welcome')).to.contain(
                'Start whenever you are ready'
            );
        });
        await eventually(page, () => {
            expect(page.section('Timer')).to.contain('Remaining 15s');
        });
    });
});
