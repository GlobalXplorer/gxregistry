const express = require('express');
      router = express.Router();

const IdentificationsController = require('../../controllers/identifications');
const AuthMiddleware = require('../../controllers/auth.middleware');

router.get('/:id', [
  IdentificationsController.getById
]);

module.exports = router;
