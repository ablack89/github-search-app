'use strict';

const express = require('express');
const routes = require('./server/routes.js');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

routes(app);

module.exports = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
