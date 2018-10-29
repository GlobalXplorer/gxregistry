const documentation = require('../data/documentation.json');
const api = require('./api');
const artifacts = require('./artifacts');
const archaeologists = require('./archaeologists');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send(documentation);
  });
  app.use('/api', api);
  app.use('/api/artifacts', artifacts);
  app.use('/api/archaeologists', archaeologists);
}
