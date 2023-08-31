import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import { acceptHeader } from '../dist/index.js';

describe('Sec-WebSocket-Accept', () => {
    it('is generated as expected', () => {
        const key = 'dGhlIHNhbXBsZSBub25jZQ==';
        const accept = acceptHeader(key);

        assert.equal(accept, 's3pPLMBiTxaQ9kYGzzhZRbK+xOo=');
    });

    it('can be called twince', () => {
        const key = 'dGhlIHNhbXBsZSBub25jZQ==';
        const accept = acceptHeader(key);

        assert.equal(accept, 's3pPLMBiTxaQ9kYGzzhZRbK+xOo=');
    });
});
