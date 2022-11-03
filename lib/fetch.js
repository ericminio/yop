import http from 'http';

export const fetch = (port) => (uri, options) => {
    const init = options || { method: 'GET' };
    return new Promise((resolve, reject) => {
        const please = {
            hostname: 'localhost',
            port: port,
            path: uri,
            method: init.method
        };
        let request = http.request(please, answer => {
            let payload = '';
            answer.on('data', chunk => {
                payload += chunk;
            });
            answer.on('end', () => {
                try {
                    let body = JSON.parse(payload);
                    let response = {
                        status: answer.statusCode,
                        json: () => {
                            return new Promise(resolve => {
                                resolve(body);
                            })
                        }
                    }
                    resolve(response);
                }
                catch (error) { reject(error); }
            });
            answer.on('error', reject);
        })
        request.on('error', reject);
        request.end();
    });
};