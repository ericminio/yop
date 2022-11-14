import { request } from '../../lib/request.js';

request({
    host: 'localhost',
    port: 5001,
    method: 'POST',
    path: '/notify'
})
    .then(() => console.log('sent'))
    .catch(error => console.log(error));