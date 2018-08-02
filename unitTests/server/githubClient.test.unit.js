const assert = require('assert');
const rewire = require('rewire');
const githubClient = rewire('../../server/githubClient.js');


const urlBuilderMock = { searchUrl: function(input){return input} };

var requestOptions;
var requestCallback;
const requestMock = function(options,callback){requestOptions = options; requestCallback = callback;}

var statusCode;
var response;
const clientResponseMock = {
  status : function(status) {
    statusCode = status;
    return this;
  },
  send : function(responseBody) {
    response = responseBody;
    return this;
  }
}

githubClient.__set__('githubUrlBuilder', urlBuilderMock);
githubClient.__set__('request', requestMock);

describe('githubClient', function() {
  describe('#search(query,clientResponse)', function() {
    it('should return server error when response from GitHub is an error', function() {
      githubClient.search('query', clientResponseMock);
      requestCallback(true, {statusCode:400}, "")

      assert.equal(500, statusCode);
    });
    it('should return empty repositories list to client when empty repositories list returned from GitHub search', function() {
      githubClient.search('query', clientResponseMock);
      requestCallback(false, {statusCode:200}, "{\"items\":[]}")

      assert.deepEqual({repositories:[]}, response);
    });
    it('should return single repository details to client when single repository returned from GitHub search', function() {
      githubClient.search('query', clientResponseMock);
      requestCallback(false, {statusCode:200}, "{\"items\":[{\"name\": \"foo\",\"stargazers_count\": 123,\"forks_count\":456,\"html_url\":\"http://foo.com\"}]}")

      assert.deepEqual({repositories:[{"name": "foo", "stars": 123, "forks": 456, "url": "http://foo.com"}]}, response);
    });
    it('should return two repositories details to client when two repositories returned from GitHub search', function() {
      githubClient.search('query', clientResponseMock);
      requestCallback(false, {statusCode:200}, "{\"items\":[{\"name\": \"foo\",\"stargazers_count\": 123,\"forks_count\":456,\"html_url\":\"http://foo.com\"},{\"name\": \"bar\",\"stargazers_count\": 321,\"forks_count\":654,\"html_url\":\"http://bar.com\"}]}")

      assert.deepEqual({repositories:[{"name": "foo", "stars": 123, "forks": 456, "url": "http://foo.com"},{"name": "bar", "stars": 321, "forks": 654, "url": "http://bar.com"}]}, response);
    });
  });
});
