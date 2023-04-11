import { expect } from 'chai';
import { page } from '../../lib/index.js';

describe('home page', () => {
    beforeEach(async () => {
        await page.open(new URL('./index.html', import.meta.url));
    });

    it('gives focus to input field', () => {
        expect(page.document.activeElement).to.equal(
            page.input('Number to decompose')
        );
    });

    it('displays an example', () => {
        expect(page.input('Number to decompose').value).to.equal('42');
        expect(page.section('Result')).to.contain('42 = 2 x 3 x 7');
    });

    it('clears results on input', () => {
        page.enter('Number to decompose', '15');

        expect(page.section('Result')).to.equal('Result');
    });
});
