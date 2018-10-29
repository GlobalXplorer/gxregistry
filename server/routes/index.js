const documentation = require('./doc.json');
const artifacts = require('./artifacts');
const archaeologists = require('./archaeologists');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send(documentation);
  });
  app.use('/api/artifacts', artifacts);
  app.use('/api/archaeologists', archaeologists);
}
