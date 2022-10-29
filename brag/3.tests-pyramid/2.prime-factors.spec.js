import { expect } from 'chai';
import { expose } from '../../lib/expose.js';
const primeFactorsOf = expose({
    symbol: 'primeFactorsOf',
    file: './brag/3.tests-pyramid/prime-factors.js'
});

describe('prime factors decomposition', () => {

    it('works for our favourite number 42', () => {
        expect(primeFactorsOf(42)).to.deep.equal([2, 3, 7]);
    });

    it('works for 2', () => {
        expect(primeFactorsOf(2)).to.deep.equal([2]);
    });
    it('works for 3', () => {
        expect(primeFactorsOf(3)).to.deep.equal([3]);
    });
    it('works for 4', () => {
        expect(primeFactorsOf(4)).to.deep.equal([2, 2]);
    });
    it('works for 9', () => {
        expect(primeFactorsOf(9)).to.deep.equal([3, 3]);
    });
});