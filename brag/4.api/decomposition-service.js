import url from 'url';
import { primeFactorsOf } from './prime-factors.js';

export const decompose = (incoming, response) => {
    const params = url.parse(incoming.url, true).query;
    const number = parseInt(params.number);
    const decomposition = primeFactorsOf(number);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ decomposition }));
};
