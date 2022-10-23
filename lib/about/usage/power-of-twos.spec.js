import { expect } from 'chai';
import { server } from './serving-index.js';
import { page } from '../../testing/page.js';

describe('power of twos', () => {

    beforeEach(done => {
        server.start(port => {
            page.open(`http://localhost:${port}`).finally(done);
        });
    });
    afterEach(done => {
        server.stop(done);
    });

    it('is available', async () => {
        page.set('number to decompose').value = '8';
        page.click('compute');

        await eventually(() => expect(page.section('results')).to.contain('2 x 2 x 2'));
    });
});

const eventually = async (verify) => {
    return new Promise((resolve, reject) => {
        let credit = 15;
        const tryNow = () => {
            try {
                verify();
                resolve();
            }
            catch(error) {
                credit --;
                if (credit === 0) { reject(error); }
                else { setTimeout(tryNow, 15); }
            }
        }
        tryNow();
    });  
};