const express = require('express'),
      bodyParser = require('body-parser'),
      bearerToken = require('express-bearer-token'),
      routes = require('./routes'),
      cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const app = express();
const whitelist = process.env.CORS.split(',');
const corsOptions = {
  'origin': function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bearerToken());

routes(app);

module.exports = app;
