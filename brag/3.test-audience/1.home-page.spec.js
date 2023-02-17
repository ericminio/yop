import { expect } from 'chai';
import { page, eventually } from '../../lib/index.js';

describe('home page', () => {
    beforeEach(async () => {
        await page.open(new URL('./index.html', import.meta.url));
    });

    it('offers prime factors decomposition', async () => {
        page.set('Number to decompose').value = '42';
        page.click('compute');

        await eventually(() =>
            expect(page.section('Results')).to.contain('42 = 2 x 3 x 7')
        );
    });
});
