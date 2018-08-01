"use strict";

const baseUrl = 'https://api.github.com/search/repositories?q={query}'


const searchUrl = function searchUrl(query) {
  return baseUrl.replace('{query}', encodeURI(query));
}

module.exports = { searchUrl }
