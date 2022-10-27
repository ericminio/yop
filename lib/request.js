import http from 'http';
import { payload } from './payload.js';

export const request = (options)=> {
    return new Promise((resolve, reject)=>{
        let request = http.request(options, async pong => {
            try {
                let body = await payload(pong);
                pong.body = body;
                resolve(pong);
            }
            catch (error) {
                reject(error);
            }
        })
        request.on('error', reject);
        request.end();
    })
};
