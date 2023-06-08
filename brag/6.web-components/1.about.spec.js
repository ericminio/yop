import { expect } from 'chai';
import { page, eventually } from '../../dist/index.js';
import { server } from './start.mjs';

describe('Web component', () => {
    beforeEach((done) => {
        server.start((port) => {
            page.open(`http://localhost:${port}`).then(done).catch(done);
        });
    });
    afterEach((done) => {
        server.stop(done);
    });

    it('is a way to reuse code', async () => {
        await eventually(() =>
            expect(page.section('Todos')).to.contain('Todo: Enjoy')
        );
        await eventually(() =>
            expect(page.section('Todos')).to.contain('Todo: Repeat')
        );
    });

    it('welcomes styles defined outside of <head>', async () => {
        await eventually(() =>
            expect(page.color('Todo: Repeat')).to.equal('blue')
        );
    });
});
