import { describe, it, beforeEach, afterEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { Page, eventually, wait } from '../../dist/index.js';
import { clearRegistrations } from './notification-service.js';
import { server } from './start.mjs';

describe('websocket server', () => {
    let baseUrl;
    let page;
    beforeEach(async () => {
        page = new Page();
        try {
            const port = await server.start();
            baseUrl = `http://localhost:${port}`;
            clearRegistrations();
            await page.open(`${baseUrl}`);
        } catch (error) {
            console.log(error);
        }
    });
    afterEach(async () => {
        await page.close();
        await server.stop();
    });

    it('can upgrade an http connection to websocket', async () => {
        await eventually(async () =>
            assert.match(await page.section('Message'), /connected/)
        );
    });

    it('can push data', async () => {
        await wait(15);
        await fetch(`${baseUrl}/notify`, {
            method: 'POST',
            body: JSON.stringify({
                event: 'greetings',
                message: 'hello world',
            }),
        });
        await eventually(async () =>
            assert.match(await page.section('Message'), /hello world/)
        );
    });

    it('resists bad request', async () => {
        await wait(15);
        try {
            await fetch(`${baseUrl}/notify`, {
                method: 'POST',
                body: JSON.stringify({ random: 'field' }),
            });
        } catch (error) {
            const { status } = JSON.parse(error.message);
            assert.equal(status, 400);
        }
    });
});
