import { expect } from 'chai';
import { page, eventually } from '../../dist/index.js';

describe('prime factors decomposition', () => {
    beforeEach(async () => {
        await page.open(new URL('./index.html', import.meta.url));
    });

    it('is available', async () => {
        page.set('Number to decompose').value = '8';
        page.click('compute');

        await eventually(() =>
            expect(page.section('Results')).to.contain('2 x 2 x 2')
        );
    });

    it('discloses waiting state immediately', async () => {
        page.set('Number to decompose').value = '42';
        page.click('compute');

        expect(page.section('Results')).to.contain('waiting...');
    });
});
