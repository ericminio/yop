import { expect } from 'chai';
import { page } from '../../lib/index.js';

describe('Greetings message', () => {

    beforeEach(async () => {
        await page.open('./brag/1.hello-world/index.html');
    });

    it('is on Welcome page', () => {
        expect(page.document.title).to.equal('Welcome');
    });

    it('is displayed', () => {
        expect(page.section('Welcome home')).to.contain('Hello World!');
    });
});