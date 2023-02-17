export const notImplemented = (incoming, response) => {
    response.writeHead(501, { 'Content-Type': 'text/plain' });
    response.end('NOT IMPLEMENTED');
};
