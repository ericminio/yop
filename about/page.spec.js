import { expect } from 'chai';
import { asset, page, Server } from '../lib/index.js';
import { URL } from 'url';

describe('page', () => {

    let file = new URL('./page-index.html', import.meta.url);

    describe('opening file', () => {

        it('works', async () => {
            await page.open(file);

            expect(page.document.title).to.equal('well done page!');
        });
    });

    describe('openning url', () => {

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