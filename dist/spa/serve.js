import { yop } from './yop.js';

export const serveYop = () => {
    return (request, response) => {
        response.statusCode = 200;
        response.setHeader('content-type', 'application/javascript');
        response.write(yop);
        response.end();
    };
};
