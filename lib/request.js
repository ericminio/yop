import http from 'http';
import { payload } from './payload.js';

export const request = (options) => {
    return new Promise((resolve, reject) => {
        let request = http.request(options, async pong => {
            if (pong.statusCode === 302) {
                const target = options;
                target.path = pong.headers.location;
                let request = http.request(target, async pong => {
                    try {
                        let body = await payload(pong);
                        pong.body = body;
                        resolve(pong);
                    }
                    catch (error) {
                        reject(error);
                    }
                });
                request.on('error', reject);
                request.end();
            }
            else {
                try {
                    let body = await payload(pong);
                    pong.body = body;
                    resolve(pong);
                }
                catch (error) {
                    reject(error);
                }
            }
        })
        request.on('error', reject);
        request.end();
    })
};
