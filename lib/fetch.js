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
                    if (answer.statusCode >= 400) {
                        const message = {
                            request: please,
                            status: answer.statusCode,
                            body: payload
                        };
                        reject(new Error(JSON.stringify(message)));
                    }
                    else {
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
                }
                catch (error) { reject(error); }
            });
            answer.on('error', reject);
        })
        request.on('error', reject);
        if (init.body) { request.write(init.body); }
        if (init.headers !== undefined) {
            init.headers.keys().forEach(key => {
                request.setHeader(key, init.headers.get(key));
            });
        }
        request.end();
    });
};
