import { expect } from 'chai';
import { acceptHeader } from '../lib/websocket-frames.js';

describe('Sec-WebSocket-Accept', () => {

    it('is generated as expected', () => {
        const key = 'dGhlIHNhbXBsZSBub25jZQ==';
        const accept = acceptHeader(key);

        expect(accept).to.equal('s3pPLMBiTxaQ9kYGzzhZRbK+xOo=');
    });

    it('can be called twince', () => {
        const key = 'dGhlIHNhbXBsZSBub25jZQ==';
        const accept = acceptHeader(key);

        expect(accept).to.equal('s3pPLMBiTxaQ9kYGzzhZRbK+xOo=');
    });
});