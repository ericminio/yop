import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import { expose } from '../dist/index.js';

describe('exposing non-module code', () => {
    it('leverages dynamic functions', () => {
        const add = new Function(
            'const sum = (a, b) => { return a+b; }; return sum;'
        )();

        assert.equal(add(40, 2), 42);
    });

    it('is available', () => {
        const add = expose({ symbol: 'sum', file: './about/expose-sample.js' });

        assert.equal(add(40, 2), 42);
    });
});
