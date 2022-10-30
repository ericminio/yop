import { expect } from 'chai';
import { page } from '../lib/index.js';

describe('page', () => {

    it('can open html file', async () => {
        await page.open('./about/page-index.html');

        expect(page.document.title).to.equal('page opening file');
    });
});