import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { exposeMethod } from '../../../../dist/code/exposeMethod.js';

const file = new URL('../../../../dist/spa/route.js', import.meta.url);
const signature = 'pathMatchesRoute(path, route)';
const pathMatchesRoute = exposeMethod({ signature, file });

describe(signature, () => {
    it('matches exact paths', () => {
        assert.equal(pathMatchesRoute('/about', '/about'), true);
    });

    it('matches route with one variable', () => {
        assert.equal(pathMatchesRoute('/products/42', '/products/:id'), true);
    });

    it('matches route with two variables', () => {
        assert.equal(
            pathMatchesRoute(
                '/products/42/electronics',
                '/products/:id/:category'
            ),
            true
        );
    });

    it('does not match route with different segment count', () => {
        assert.equal(
            pathMatchesRoute('/orders/42/items/15', '/product/:id'),
            false
        );
    });

    it('does not match route with different non-variable segment', () => {
        assert.equal(pathMatchesRoute('/orders/42', '/products/:id'), false);
    });
});
