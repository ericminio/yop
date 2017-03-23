var expect = require('chai').expect;

describe('yop', function() {

    it('can be required', function() {
        expect(require('./lib/yop')).not.to.equal(undefined);
    });
});
