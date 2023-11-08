import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { trimplus } from '../../../../dist/testing/trimplus.js';

describe('page section text', () => {
    it('removes extra space', () => {
        assert.equal(trimplus(' a  b   c    '), 'a b c');
    });

    it('removes extra new lines', () => {
        assert.equal(trimplus(' \na\nb\n   c\n\nd    '), 'a b c d');
    });
});
