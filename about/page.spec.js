import { expect } from 'chai';
import { asset, page, Server } from '../lib/index.js';

describe('page', () => {

    let file = './about/page-index.html';

    describe('opening file', () => {

        it('works', async () => {
            await page.open(file);

            expect(page.document.title).to.equal('well done page!');
        });
    });

    describe('openining url', () => {

        let server;
        let port = 5001;
        beforeEach(done => {
            server = new Server(port, asset(file));
            server.start(() => done());
        });
        afterEach(done => {
            server.stop(done);
        });

        it('works', async () => {
            await page.open(`http://localhost:${port}`);

            expect(page.document.title).to.equal('well done page!');
        });
    });
});