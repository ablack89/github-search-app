const assert = require('assert');
const githubUrlBuilder = require('../../server/githubUrlBuilder.js');

describe('githubUrlBuilder', function() {
  describe('#searchUrl(query)', function() {
    it('should return URL with query included', function() {
      assert.equal('https://api.github.com/search/repositories?q=foo', githubUrlBuilder.searchUrl('foo'));
    });
    it('should URL encode query within URL', function() {
      assert.equal('https://api.github.com/search/repositories?q=foo%20bar', githubUrlBuilder.searchUrl('foo bar'));
    });
  });
});
