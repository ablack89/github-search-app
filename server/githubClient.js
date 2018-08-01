'use strict';

var request = require('request');
var githubUrlBuilder = require('./githubUrlBuilder.js');

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'GitHub Search App'//,
  // 'Authorization': 'token 0bd291692636a1dac9e8413003f1a9ba4547739a'
};

const search = function search(query, clientResponse) {
  const options = constructRequestOptions(githubUrlBuilder.searchUrl(query));
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const responseBody = JSON.parse(body);
      const mappedResponse = mapResponse(responseBody);
      clientResponse.send(mappedResponse);
    } else {
      clientResponse.status(500).send('Error contacting GitHub');
    }
  });
}

function constructRequestOptions(url) {
  return {
    'uri': url,
    'headers': headers
  }
}

function mapResponse(responseBody) {
  const response = {};
  response.repositories = responseBody.items.map(item => { return {'name': item.name, 'stars': item.stargazers_count, 'forks': item.forks_count}});
  return response;
}

module.exports = { search };
