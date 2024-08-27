import {
    describe,
    test,
    before,
    after,
    beforeEach,
    afterEach,
} from 'node:test';
import { strict as assert } from 'node:assert';
import { contentOfFile, eventually, Page } from '../../../dist/index.js';
import { server } from '../app/web/server.js';
import { writeFileSync } from 'node:fs';

describe('YOP_AUTO_RELOAD', () => {
    let page;
    let baseUrl;
    before(async () => {
        process.env.YOP_AUTO_RELOAD = 1;

        const port = await server.start();
        baseUrl = `http://localhost:${port}`;
    });
    after(async () => {
        await server.stop();
    });
    beforeEach(async () => {
        page = new Page();
    });
    afterEach(async () => {
        await page.close();
    });

    test('enables automatic reload when source changes', async () => {
        const content = contentOfFile(
            new URL('./content.html', import.meta.url)
        );
        const file = new URL('../app/web/ignore.html', import.meta.url);
        writeFileSync(file, content);
        await page.open(baseUrl);
        await eventually(page, async () => {
            assert.match(await page.section('Reload'), /Hello world/);
        });
        writeFileSync(file, content.replace('Hello world', 'Hello universe'));

        await eventually(page, async () => {
            assert.match(await page.section('Reload'), /Hello universe/);
        });
    });
});
