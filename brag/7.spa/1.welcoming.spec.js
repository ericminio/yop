import { expect } from 'chai';
import { eventually, page } from '../../dist/index.js';
import { server } from './start.mjs';

describe('Welcoming', () => {
    beforeEach((done) => {
        server.start((port) => {
            page.open(`http://localhost:${port}`).then(done).catch(done);
        });
    });
    afterEach((done) => {
        server.stop(done);
    });

    it('is home page', async () => {
        expect(page.window.location.pathname).to.equal('/');
    });

    it('welcomes home', async () => {
        await eventually(() => {
            expect(page.section('Welcome Home')).not.to.equal(undefined);
        });
    });

    it('offers options', async () => {
        await eventually(page, () => {
            expect(page.section('Menu')).to.contain('Home');
            expect(page.section('Menu')).to.contain('About');
        });
    });
});
