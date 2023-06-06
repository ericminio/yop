import { expect } from 'chai';
import { page } from '../../lib/index.js';

describe('Web component', () => {
    beforeEach(async () => {
        await page.open(new URL('./index.html', import.meta.url));
    });

    it('is a way to reuse code', () => {
        expect(page.section('Todos')).to.contain('Todo: Enjoy');
        expect(page.section('Todos')).to.contain('Todo: Repeat');
    });
});
