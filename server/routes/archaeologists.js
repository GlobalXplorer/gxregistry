const express = require('express'),
      router = express.Router();

const ArchaeologistsController = require('../controllers/archaeologists');

router.get('/', function (req, res) {
  res.send('Archaeologists');
});

router.get('/:id', [
  ArchaeologistsController.getById
]);

module.exports = router;
