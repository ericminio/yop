export const serveDecomposition = (incoming, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
        decomposition: [2, 3, 7]
    }));
};