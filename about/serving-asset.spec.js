import { expect } from 'chai';
import {
    serveAsset,
    fetch,
    Server,
    contentOfBinaryFile,
} from '../dist/index.js';

describe('Serving asset handler', () => {
    let server;
    let port = 5001;
    beforeEach((done) => {
        server = new Server(port);
        server.start(() => done());
    });
    afterEach((done) => {
        server.stop(done);
    });

    it('can server html', async () => {
        server.use(
            serveAsset(new URL('./serving-asset-index.html', import.meta.url))
        );
        const response = await fetch(port)('/');

        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.equal('text/html');
        expect(response.headers['cache-control']).to.equal('max-age=45');
        expect(response.body).to.contain('<title>serving html</title>');
    });

    it('can server javascript', async () => {
        server.use(
            serveAsset(new URL('./serving-asset-code.js', import.meta.url))
        );
        const response = await fetch(port)('/');

        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.equal(
            'application/javascript'
        );
        expect(response.body.trim()).to.equal('const sum = (a, b) => a + b;');
    });

    it('can server css', async () => {
        server.use(
            serveAsset(new URL('./serving-asset-css.css', import.meta.url))
        );
        const response = await fetch(port)('/');

        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.equal('text/css');
        expect(response.body.trim()).to.equal('body {\n    color: green;\n}');
    });

    it('can serve png', async () => {
        const image = new URL('./serving-asset-image.png', import.meta.url);
        const expected = contentOfBinaryFile(image);
        server.use(serveAsset(image));
        const response = await fetch(port)('/');

        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.equal('image/png');
        expect(response.body.equals(Buffer.from(expected, 'binary'))).to.equal(
            true
        );
    });

    it('can serve jpg', async () => {
        const image = new URL('./serving-asset-image.jpg', import.meta.url);
        const expected = contentOfBinaryFile(image);
        server.use(serveAsset(image));
        const response = await fetch(port)('/');

        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.equal('image/jpeg');
        expect(response.body.equals(Buffer.from(expected, 'binary'))).to.equal(
            true
        );
    });
});
