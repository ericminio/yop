import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import { exposex } from '../dist/index.js';

describe('exposing from several files with non-module code', () => {
    it('is available', () => {
        const far = exposex({
            symbol: 'far',
            files: ['./about/exposex-dep.js', './about/exposex-code.js'],
        });

        assert.equal(far(3, 2), 3 * 3 + 2 * 2);
    });

    it('offers exposing several symbols', () => {
        const { far, square } = exposex({
            symbols: ['far', 'square'],
            files: ['./about/exposex-dep.js', './about/exposex-code.js'],
        });

        assert.equal(far(3, 2), 3 * 3 + 2 * 2);
        assert.equal(square(3), 3 * 3);
    });
});
