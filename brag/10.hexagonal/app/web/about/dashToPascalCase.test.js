import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import { dashCaseToPascalCase } from './dashCaseToPascalCase.js';

describe('DashCase to PascalCase', () => {
    it('works as expected', () => {
        assert.equal(dashCaseToPascalCase('a'), 'A');
        assert.equal(dashCaseToPascalCase('aa'), 'Aa');
        assert.equal(dashCaseToPascalCase('aa-bb'), 'AaBb');
    });
});
