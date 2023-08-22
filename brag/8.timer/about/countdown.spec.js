import { expect } from 'chai';
import { eventually, page, wait } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe.only('Count down', () => {
    beforeEach((done) => {
        server.start((port) => {
            page.open(`http://localhost:${port}`).then(done).catch(done);
        });
    });
    afterEach((done) => {
        server.stop(done);
    });

    it('can be triggered', async () => {
        await eventually(page, () => {
            expect(page.section('Welcome')).to.contain(
                'Start whenever you are ready'
            );
        });
        page.click('Start');

        await eventually(page, () => {
            expect(page.section('Timer')).to.contain('Remaining 14s');
            expect(page.section('Timer')).not.to.contain('Done');
        });
    });

    it('notifies when done', async () => {
        await eventually(page, () => {
            expect(page.section('Welcome')).to.contain(
                'Start whenever you are ready'
            );
        });
        page.document.yoptimer = new page.document.YopTimer({
            delay: 150,
            count: 3,
        });
        page.click('Start');

        await eventually(page, () => {
            expect(page.section('Timer')).to.contain('Remaining 0s');
            expect(page.section('Timer')).to.contain('Done');
        });
    });
});
