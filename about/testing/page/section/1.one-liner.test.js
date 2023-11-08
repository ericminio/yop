import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { oneliner } from '../../../../dist/testing/oneliner.js';

describe('page section text', () => {
    it('removes extra space', () => {
        assert.equal(oneliner(' a  b   c    '), 'a b c');
    });

    it('removes extra new lines', () => {
        assert.equal(oneliner(' \na\nb\n   c\n\nd    '), 'a b c d');
    });
});
