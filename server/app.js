const express = require('express'),
      bodyParser = require('body-parser'),
      bearerToken = require('express-bearer-token'),
      routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bearerToken());

routes(app);

module.exports = app;
