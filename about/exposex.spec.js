import { expect } from 'chai';
import { exposex } from '../dist/index.js';

describe('exposing several files with non-module code', () => {
    it('is available', () => {
        const far = exposex({
            symbol: 'far',
            files: ['./about/exposex-dep.js', './about/exposex-code.js'],
        });

        expect(far(3, 2)).to.equal(3 * 3 + 2 * 2);
    });
});
