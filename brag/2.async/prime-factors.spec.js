import { expect } from 'chai';
import { page, eventually } from '../../lib/index.js';

describe('prime factors decomposition', () => {

    beforeEach(async () => {
        await page.open('./brag/2.async/index.html');
    });

    it('is available', async () => {
        page.set('Number to decompose').value = '8';
        page.click('compute');

        await eventually(() =>
            expect(page.section('Results')).to.contain('2 x 2 x 2')
        );
    });
});

