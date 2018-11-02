const documentation = require('../data/documentation.json');
const web3Router = require('./web3');
const apiRouter = require('./api');
const artifactsRouter = require('./api/artifacts');
const archaeologistsRouter = require('./api/archaeologists');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send(documentation);
  });
  app.use('/web3', web3Router);
  app.use('/api', apiRouter);
  app.use('/api/artifacts', artifactsRouter);
  app.use('/api/archaeologists', archaeologistsRouter);
}
