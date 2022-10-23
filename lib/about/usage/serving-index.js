import { Server } from '../../dist/server.js';
import fs from 'fs';
const content = fs.readFileSync('./lib/about/usage/app/index.html').toString();

const servingHtml = (request, response) => {
    response.setHeader('Content-Length', content.length);
    response.setHeader('Content-Type', 'text/html');
    response.end(content);
};

export const server = new Server(5001, servingHtml); 
