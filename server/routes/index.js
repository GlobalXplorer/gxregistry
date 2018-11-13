const documentation = require('../data/documentation.json');
const web3Router = require('./web3');
const apiRouter = require('./api');
const artifactsRouter = require('./api/artifacts');
const archaeologistsRouter = require('./api/archaeologists');
const identificationsRouter = require('./api/identifications');
const attributionsRouter = require('./api/attributions');
const locationsRouter = require('./api/locations');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send(documentation);
  });
  app.use('/web3', web3Router);
  app.use('/api', apiRouter);
  app.use('/api/artifacts', artifactsRouter);
  app.use('/api/archaeologists', archaeologistsRouter);
  app.use('/api/identifications', identificationsRouter);
  app.use('/api/attributions', attributionsRouter);
  app.use('/api/locations', locationsRouter);
}
