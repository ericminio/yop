import crypto from 'crypto';
const websocketMagicNumber = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

export const acceptHeader = (key) => {
    const both = `${key}${websocketMagicNumber}`;
    const shasum = crypto.createHash('sha1')
    shasum.update(both);

    return shasum.digest('base64');
};

export const encodeSingleFrameOfText = (text) => {
    let buffer = Buffer.alloc(2 + text.length);
    buffer[0] = 0x81;
    buffer[1] = text.length;
    Buffer.from(text).copy(buffer, 2);

    return buffer;
};
