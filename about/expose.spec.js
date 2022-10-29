import { expect } from 'chai';
import { expose } from '../lib/expose.js';

describe('exposing non-module code', () => {

    it('leverages dynamic functions', () => {
        const add = (new Function('const sum = (a, b) => { return a+b; }; return sum;'))();

        expect(add(40, 2)).to.equal(42);
    });

    it('is available', () => {
        const add = expose({ symbol: 'sum', file: './about/expose-sample.js' });

        expect(add(40, 2)).to.equal(42);
    });
});