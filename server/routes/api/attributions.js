const express = require('express');
      router = express.Router();

const AttributionsController = require('../../controllers/attributions');
// const AuthMiddleware = require('../../controllers/auth.middleware');

router.get('/:id', [
  AttributionsController.getById
]);

module.exports = router;
