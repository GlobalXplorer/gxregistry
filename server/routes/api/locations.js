const express = require('express');
      router = express.Router();

const LocationsController = require('../../controllers/locations');
// const AuthMiddleware = require('../../controllers/auth.middleware');

router.get('/:id', [
  LocationsController.getById
]);

module.exports = router;
