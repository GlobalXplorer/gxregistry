const documentation = require('../data/documentation.json');
const web3 = require('./web3');
const api = require('./api');
const artifacts = require('./artifacts');
const archaeologists = require('./archaeologists');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send(documentation);
  });
  app.use('/web3', web3);
  app.use('/api', api);
  app.use('/api/artifacts', artifacts);
  app.use('/api/archaeologists', archaeologists);
}
