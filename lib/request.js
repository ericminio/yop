import http from 'http';
import { payload } from './payload.js';

export const request = (options) => {
    return new Promise((resolve, reject) => {
        let request = http.request(options, async (pong) => {
            if (pong.statusCode === 302) {
                const target = options;
                target.path = pong.headers.location;
                let request = http.request(target, async (pong) => {
                    payload(pong)
                        .then((body) => {
                            pong.body = body;
                            resolve(pong);
                        })
                        .catch(reject);
                });
                request.on('error', reject);
                request.end();
            } else {
                payload(pong)
                    .then((body) => {
                        pong.body = body;
                        resolve(pong);
                    })
                    .catch(reject);
            }
        });
        request.on('error', reject);
        if (options.body) {
            request.write(options.body);
        }
        request.end();
    });
};
