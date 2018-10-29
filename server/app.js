const express = require('express'),
      bodyParser = require('body-parser'),
      routes = require('./routes');

const app = express();

app.use(bodyParser.json());

routes(app);

module.exports = app;
