import http from 'http';
import { payload } from './payload.js';

export const fetch = (port) => (uri, options) => {
    const init = options || { method: 'GET' };
    return new Promise((resolve, reject) => {
        const please = {
            hostname: 'localhost',
            port: port,
            path: uri,
            method: init.method,
        };
        let request = http.request(please, (answer) => {
            payload(answer)
                .then((body) => {
                    try {
                        if (answer.statusCode === 302) {
                            const target = please;
                            target.path = answer.headers.location;
                            let request = http.request(target, async (pong) => {
                                payload(pong)
                                    .then((body) => {
                                        let response = {
                                            status: pong.statusCode,
                                            headers: pong.headers,
                                            body,
                                            json: () => {
                                                return new Promise(
                                                    (resolve) => {
                                                        resolve(
                                                            JSON.parse(body)
                                                        );
                                                    }
                                                );
                                            },
                                            text: () => {
                                                return new Promise(
                                                    (resolve) => {
                                                        resolve(body);
                                                    }
                                                );
                                            },
                                        };
                                        resolve(response);
                                    })
                                    .catch(reject);
                            });
                            request.on('error', reject);
                            request.end();
                        } else {
                            let response = {
                                status: answer.statusCode,
                                headers: answer.headers,
                                body,
                                json: () => {
                                    return new Promise((resolve) => {
                                        resolve(JSON.parse(body));
                                    });
                                },
                                text: () => {
                                    return new Promise((resolve) => {
                                        resolve(body);
                                    });
                                },
                            };
                            resolve(response);
                        }
                    } catch (error) {
                        reject(error);
                    }
                })
                .catch(reject);
        });
        request.on('error', reject);
        if (init.body) {
            request.write(init.body);
        }
        if (init.headers !== undefined) {
            init.headers.keys().forEach((key) => {
                request.setHeader(key, init.headers.get(key));
            });
        }
        request.end();
    });
};
