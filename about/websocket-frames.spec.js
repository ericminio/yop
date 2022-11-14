import { expect } from 'chai';
import { encodeSingleFrameOfText } from '../lib/websocket-frames.js';

describe('encoding', () => {

    it('does not require a mask', () => {
        expect(encodeSingleFrameOfText('a')).to.deep.equal(Buffer.from([0x81, 1, 97]));
    });
});