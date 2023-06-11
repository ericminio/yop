export const payload = (incoming) => {
    const contentTypeIndex = incoming.rawHeaders.indexOf('Content-Type');
    if (
        contentTypeIndex > 0 &&
        incoming.rawHeaders[contentTypeIndex + 1].indexOf('image') == 0
    ) {
        return new Promise((resolve, reject) => {
            const body = [];
            incoming.on('data', (chunk) => {
                body.push(Buffer.from(chunk, 'binary'));
            });
            incoming.on('end', () => {
                resolve(Buffer.concat(body));
            });
            incoming.on('error', reject);
        });
    }
    return new Promise((resolve, reject) => {
        let body = '';
        incoming.on('data', (chunk) => {
            body += chunk;
        });
        incoming.on('end', () => {
            resolve(body);
        });
        incoming.on('error', reject);
    });
};
