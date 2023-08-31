import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';

import { expose } from '../../dist/index.js';
const primeFactorsOf = expose({
    symbol: 'primeFactorsOf',
    file: './brag/3.test-audience/prime-factors.js',
});

describe('test audience - prime factors decomposition', () => {
    it('works for our favorite number 42', () => {
        assert.deepStrictEqual(primeFactorsOf(42), [2, 3, 7]);
    });

    it('works for 2', () => {
        assert.deepStrictEqual(primeFactorsOf(2), [2]);
    });
    it('works for 3', () => {
        assert.deepStrictEqual(primeFactorsOf(3), [3]);
    });
    it('works for 4', () => {
        assert.deepStrictEqual(primeFactorsOf(4), [2, 2]);
    });
    it('works for 9', () => {
        assert.deepStrictEqual(primeFactorsOf(9), [3, 3]);
    });
});
