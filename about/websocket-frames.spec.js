import { expect } from 'chai';
import {
    decodeSingleFrameOfText,
    encodeSingleFrameOfText,
} from '../lib/websocket-frames.js';

describe('encoding', () => {
    it('does not require a mask', () => {
        expect(encodeSingleFrameOfText('a')).to.deep.equal(
            Buffer.from([0x81, 1, 97])
        );
    });
});

describe('decoding of small text in one frame', () => {
    const abcdef = Buffer.from([
        0x81, 0x86, 0xb0, 0x4c, 0x40, 0xcd, 0xd1, 0x2e, 0x23, 0xa9, 0xd5, 0x2a,
    ]);

    it('can be decoded', () => {
        const decoded = decodeSingleFrameOfText(abcdef);

        expect(decoded).to.equal('abcdef');
    });
});
