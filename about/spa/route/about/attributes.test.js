import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { exposeMethod } from '../../../../dist/code/exposeMethod.js';

const file = new URL('../../../../dist/spa/route.js', import.meta.url);
const signature = 'buildAttributes(path, route)';
const buildAttributes = exposeMethod({ signature, file });

describe(signature, () => {
    it('can extract one attribute', () => {
        assert.equal(
            buildAttributes('/products/42', '/products/:id'),
            'data-id="42"'
        );
    });

    it('can extract two attributes', () => {
        assert.equal(
            buildAttributes(
                '/products/42/colors/blue',
                '/products/:id/colors/:color'
            ),
            'data-id="42" data-color="blue"'
        );
    });
});
