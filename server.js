'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(express.static('client'));

app.use(function (req, res, next) {
  res.status(404).send("Not found")
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Server error')
})

module.exports = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
