import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { serveAsset, eventually, Server } from '../dist/index.js';
import { Page } from '../dist/testing/page-jsdom.js';
import { URL } from 'url';

describe('page jsdom', () => {
    let file = new URL('./page-index.html', import.meta.url);
    let page = new Page();

    describe('opening file', () => {
        it('works', async () => {
            await page.open(file);

            assert.equal(page.document.title, 'well done page!');
        });
    });

    describe('opening url', () => {
        let server;
        let baseUrl;
        beforeEach(async () => {
            server = new Server(serveAsset(file));
            const port = await server.start();
            baseUrl = `http://localhost:${port}`;
        });
        afterEach(async () => {
            await server.stop();
        });

        it('works', async () => {
            await page.open(`${baseUrl}`);

            assert.equal(page.document.title, 'well done page!');
        });

        it('resists bad url', async () => {
            try {
                await page.open('bad url');
            } catch (error) {
                assert.equal(
                    error.message,
                    'The "path" argument must be of type string. Received undefined'
                );
            }
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
            assert.match(page.section('data'), /hello world/);
        });
    });

    it('needs a defined document', async () => {
        await page.open(file);
        page.document = undefined;
        try {
            page.find('anything');
        } catch (error) {
            assert.equal(error.message, 'page.document must be defined');
        }
    });

    it('needs a non-null document', async () => {
        await page.open(file);
        page.document = null;
        try {
            page.find('anything');
        } catch (error) {
            assert.equal(error.message, 'page.document must be defined');
        }
    });

    it('offers section selection', async () => {
        await page.open(file);

        assert.match(page.section('Welcome'), /Hello world/);
    });

    it('selects first smallest section with matching content', async () => {
        await page.open(
            new URL('./page-nested-sections.html', import.meta.url)
        );
        const monday = page.section('Monday');

        assert.match(monday, /Dentist/);
        assert.doesNotMatch(monday, /Shopping/);
    });

    it('section returned as one line', async () => {
        await page.open(
            new URL('./page-nested-sections.html', import.meta.url)
        );

        assert.match(page.section('Mouse'), /Quantity - 1 +/);
        assert.equal(page.section('Monitor'), 'Monitor Quantity - 2 + $ 300');
    });

    it('can click on a button with partially matching content', async () => {
        await page.open(new URL('./page-buttons.html', import.meta.url));
        page.click('great');

        assert.equal(page.section('Message'), 'Message great indeed');
    });

    it('can click on a button with matching name', async () => {
        await page.open(new URL('./page-buttons.html', import.meta.url));
        page.click('order');

        assert.equal(page.section('Message'), 'Message order in!');
    });

    describe('setting input via label', () => {
        it('works as expected', async () => {
            await page.open(new URL('./page-inputs.html', import.meta.url));
            page.set('Number').value = '42';
            page.click('Go');

            assert.match(page.section('Happy path'), /42/);
        });

        it('inform of missing for attribute on label', async () => {
            await page.open(new URL('./page-inputs.html', import.meta.url));
            try {
                page.set('Number for missing htmlFor').value = '42';
            } catch (error) {
                assert.equal(
                    error.message,
                    "label with text 'Number for missing htmlFor' is missing for attribute"
                );
            }
        });

        it('inform of missing id attribute on input', async () => {
            await page.open(new URL('./page-inputs.html', import.meta.url));
            try {
                page.set('Number for missing input id').value = '42';
            } catch (error) {
                assert.equal(
                    error.message,
                    "input with id 'input-with-missing-id' not found"
                );
            }
        });
    });
});
