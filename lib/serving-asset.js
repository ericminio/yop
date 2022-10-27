import fs from 'fs';

const mime = {
    'html': 'text/html'
};

export const asset = (file) => {
    const content = fs.readFileSync(file).toString();
    const type = mime[file.substring(file.lastIndexOf('.') + 1)];
    
    return (request, response) => {
        response.setHeader('Content-Length', content.length);
        response.setHeader('Content-Type', type);
        response.end(content);
    };
};
