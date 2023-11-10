import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { eventually, expose } from '../../../dist/index.js';

const clearResult = expose({
    symbol: 'clearResult',
    file: './brag/2.async/app/page.js',
});

describe('async - ux - clearResult', () => {
    it('empties the target', async () => {
        const target = {
            innerHTML: 'initial value',
        };
        clearResult(target);

        await eventually(async () => {
            assert.deepStrictEqual(target.innerHTML, 'waiting...');
        });
    });
});
