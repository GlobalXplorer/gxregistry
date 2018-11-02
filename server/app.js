const express = require('express'),
      bodyParser = require('body-parser'),
      bearerToken = require('express-bearer-token'),
      routes = require('./routes'),
      cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bearerToken());

routes(app);

module.exports = app;
