import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import {
    decodeLength,
    decodeSingleFrameOfText,
    encodeSingleFrameOfText,
    extractData,
    extractMask,
    isFrameFinal,
    isText,
} from '../dist/index.js';

describe('encoding', () => {
    it('does not require a mask', () => {
        assert.deepStrictEqual(
            encodeSingleFrameOfText('a'),
            Buffer.from([0x81, 1, 97])
        );
    });
});

describe('decoding of small text in one frame', () => {
    const abcdef = Buffer.from([
        0x81, 0x86, 0xb0, 0x4c, 0x40, 0xcd, 0xd1, 0x2e, 0x23, 0xa9, 0xd5, 0x2a,
    ]);

    it('can be identified as single frame', () => {
        assert.ok(isFrameFinal(abcdef));
    });

    it('can be identified as text', () => {
        assert.ok(isText(abcdef));
    });

    it('has length available', () => {
        const length = decodeLength(abcdef);

        assert.equal(length, 6);
    });

    it('has mask available', () => {
        const mask = extractMask(abcdef);

        assert.deepStrictEqual(mask, Buffer.from([0xb0, 0x4c, 0x40, 0xcd]));
    });

    it('has data available', () => {
        const data = extractData(abcdef);

        assert.deepStrictEqual(
            data,
            Buffer.from([0xd1, 0x2e, 0x23, 0xa9, 0xd5, 0x2a])
        );
    });

    it('can be decoded', () => {
        const decoded = decodeSingleFrameOfText(abcdef);

        assert.equal(decoded, 'abcdef');
    });
});
