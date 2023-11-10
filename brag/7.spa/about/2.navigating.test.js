import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, Page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe('spa - Navigating', () => {
    let page;
    let baseUrl;
    before(async () => {
        page = new Page();
        const port = await server.start();
        baseUrl = `http://localhost:${port}`;
        await page.open(baseUrl);
        await eventually(async () => {
            assert.match(await page.section('Menu'), /About/);
        });
        page.click('About');
    });
    after(async () => {
        await page.close();
        await server.stop();
    });

    it('leads elsewhere', async () => {
        await eventually(async () => {
            assert.equal(await page.location(), `${baseUrl}/about`);
        });
    });

    it('displays the targetted page', async () => {
        await eventually(async () => {
            assert.match(
                await page.section('About page'),
                /this is the about page/
            );
        });
    });

    it('has left initial page', async () => {
        await eventually(async () => {
            try {
                await page.section('Welcome Home');
                fail('should not be found');
            } catch (error) {
                assert.equal(
                    error.message,
                    "section with text or name 'Welcome Home' not found"
                );
            }
        });
    });
});
