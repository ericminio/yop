import { expect } from 'chai';
import { page, eventually, request } from '../../lib/index.js';
import { server } from './start.mjs';

describe('home page', () => {

    beforeEach(done => {
        server.start(port => {
            page.open(`http://localhost:${port}`).then(done).catch(done);
        });
    });
    afterEach(done => {
        server.stop(done);
    });

    it('displays pushed message', async () => {
        page.click('broadcast');

        await eventually(() =>
            expect(page.section('Message')).to.contain('hello')
        );
    });
});

