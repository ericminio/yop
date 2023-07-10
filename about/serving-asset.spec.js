import { expect } from 'chai';
import { serveAsset, Server, contentOfBinaryFile } from '../dist/index.js';
const port = 5001;
const baseUrl = `http://localhost:${port}`;

describe('Serving asset handler', () => {
    let server;
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
        const response = await fetch(`${baseUrl}/`);

        expect(response.status).to.equal(200);
        expect(response.headers.get('content-type')).to.equal('text/html');
        expect(response.headers.get('cache-control')).to.equal('max-age=45');
        expect(await response.text()).to.contain('<title>serving html</title>');
    });

    it('can server javascript', async () => {
        server.use(
            serveAsset(new URL('./serving-asset-code.js', import.meta.url))
        );
        const response = await fetch(`${baseUrl}/`);

        expect(response.status).to.equal(200);
        expect(response.headers.get('content-type')).to.equal(
            'application/javascript'
        );
        expect((await response.text()).trim()).to.equal(
            'const sum = (a, b) => a + b;'
        );
    });

    it('can server css', async () => {
        server.use(
            serveAsset(new URL('./serving-asset-css.css', import.meta.url))
        );
        const response = await fetch(`${baseUrl}/`);

        expect(response.status).to.equal(200);
        expect(response.headers.get('content-type')).to.equal('text/css');
        expect((await response.text()).trim()).to.equal(
            'body {\n    color: green;\n}'
        );
    });

    it('can serve png', async () => {
        const image = new URL('./serving-asset-image.png', import.meta.url);
        const expected = Buffer.from(contentOfBinaryFile(image), 'binary');
        server.use(serveAsset(image));
        const response = await fetch(`${baseUrl}/`);

        expect(response.status).to.equal(200);
        expect(response.headers.get('content-type')).to.equal('image/png');
        const actual = Buffer.from(await (await response.blob()).arrayBuffer());
        expect(actual.equals(expected)).to.equal(true);
    });

    it('can serve jpg', async () => {
        const image = new URL('./serving-asset-image.jpg', import.meta.url);
        const expected = Buffer.from(contentOfBinaryFile(image), 'binary');
        server.use(serveAsset(image));
        const response = await fetch(`${baseUrl}/`);

        expect(response.status).to.equal(200);
        expect(response.headers.get('content-type')).to.equal('image/jpeg');
        const actual = Buffer.from(await (await response.blob()).arrayBuffer());
        expect(actual.equals(expected)).to.equal(true);
    });
});
