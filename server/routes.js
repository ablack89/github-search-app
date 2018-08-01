'use strict';

const express = require('express');
const githubClient = require('./githubClient.js');


const router = function (app) {
  app.use(express.static('client'));

  app.get('/api/search', function(request, response) {
    var searchQuery = request.query.q;
    if (searchQuery != null && searchQuery !== '') {
      githubClient.search(searchQuery, response);
    } else {
      response.status(400).send('Missing search query');
    }
  })

  app.use(function (req, res, next) {
    res.status(404).send("Not found");
  })

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Server error');
  })
}

module.exports = router;
