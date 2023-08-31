import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { page, eventually } from '../../dist/index.js';
import { server } from './start.mjs';

describe('Web component', () => {
    beforeEach(async () => {
        const port = await server.start();
        await page.open(`http://localhost:${port}`);
    });
    afterEach(async () => {
        await page.close();
        await server.stop();
    });

    it('is a way to reuse code', async () => {
        await eventually(() => {
            assert.match(page.section('Todos'), /Todo: Enjoy/);
            assert.match(page.section('Todos'), /Todo: Repeat/);
        });
    });

    it('welcomes styles defined outside of <head>', async () => {
        await eventually(() =>
            assert.equal(page.color('Todo: Repeat'), 'blue')
        );
    });
});
