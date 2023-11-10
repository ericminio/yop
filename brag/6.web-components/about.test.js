import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { Page, eventually } from '../../dist/index.js';
import { server } from './start.mjs';

describe('Web component', () => {
    let page;
    before(async () => {
        page = new Page();
        const port = await server.start();
        await page.open(`http://localhost:${port}`);
    });
    after(async () => {
        await page.close();
        await server.stop();
    });

    it('is a way to reuse code', async () => {
        await eventually(async () => {
            assert.match(await page.section('Todos'), /Todo: Enjoy/);
            assert.match(await page.section('Todos'), /Todo: Repeat/);
        });
    });

    it('welcomes styles defined outside of <head>', async () => {
        await eventually(async () =>
            assert.equal(await page.color('Todo: Repeat'), 'rgb(0, 0, 255)')
        );
    });
});
