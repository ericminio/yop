import { expect } from 'chai';
import { eventually, page } from '../../../dist/index.js';
import { server } from '../app/start.mjs';

describe('Navigating', () => {
    beforeEach((done) => {
        server.start((port) => {
            page.open(`http://localhost:${port}`).then(done).catch(done);
        });
    });
    afterEach((done) => {
        server.stop(done);
    });

    it('is possible', async () => {
        await eventually(() => {
            expect(page.section('Menu')).to.contain('About');
        });
        page.click('About');
        expect(page.window.location.pathname).to.equal('/about');
    });

    it('leads elsewhere', async () => {
        await eventually(() => {
            expect(page.section('Menu')).to.contain('About');
        });
        page.click('About');
        await eventually(() => {
            expect(page.section('About page')).to.contain(
                'this is the about page'
            );
            expect(page.document.body.textContent).not.to.contain(
                'Welcome Home'
            );
        });
    });
});
