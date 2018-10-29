const express = require('express');
      router = express.Router();

const ArtifactsController = require('../controllers/artifacts');

router.get('/', function (req, res) {
  res.send('Artifacts');
});

router.post('/', [
  ArtifactsController.create
]);

module.exports = router;
