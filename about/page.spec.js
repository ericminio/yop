import { expect } from 'chai';
import { serveAsset, eventually, page, Server } from '../dist/index.js';
import { URL } from 'url';

describe('page', () => {
    let file = new URL('./page-index.html', import.meta.url);

    describe('opening file', () => {
        it('works', async () => {
            await page.open(file);

            expect(page.document.title).to.equal('well done page!');
        });
    });

    describe('opening url', () => {
        let server;
        let port = 5001;
        beforeEach((done) => {
            server = new Server(port, serveAsset(file));
            server.start(() => done());
        });
        afterEach((done) => {
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
            fetch: () =>
                Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({ value: 'hello world' }),
                }),
        });

        await eventually(() => {
            expect(page.section('data')).to.contain('hello world');
        });
    });

    it('offers section selection', async () => {
        await page.open(file);

        expect(page.section('Welcome')).to.contain('Hello world');
    });

    it('selects first smallest section with matching content', async () => {
        await page.open(
            new URL('./page-nested-sections.html', import.meta.url)
        );
        const monday = page.section('Monday');

        expect(monday).to.contain('Dentist');
        expect(monday).not.to.contain('Shopping');
    });

    it('section returned as one line', async () => {
        await page.open(
            new URL('./page-nested-sections.html', import.meta.url)
        );

        expect(page.section('Mouse')).to.contain('Quantity - 1 +');
        expect(page.section('Monitor')).to.equal(
            'Monitor Quantity - 2 + $ 300'
        );
    });
});
