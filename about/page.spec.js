import { expect } from 'chai';
import { asset, eventually, page, Server } from '../lib/index.js';
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

    it('accepts fetch stub', async () => {
        let file = new URL('./page-stubbing-fetch.html', import.meta.url);
        await page.open(file, {
            fetch: () => Promise.resolve({
                status: 200,
                json: () => Promise.resolve({ value: 'hello world' })
            })
        }
        );

        await eventually(() => {
            expect(page.section('data')).to.contain('hello world');
        });
    });
});