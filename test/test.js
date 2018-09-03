'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('test function test', () => {
    it('should return proper string', () => {
        var result = index.test("abc");
        expect(result).to.equal("test [abc]");
    });
});
