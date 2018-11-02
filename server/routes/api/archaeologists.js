const express = require('express'),
      router = express.Router();

const ArchaeologistsController = require('../../controllers/archaeologists');
const AuthMiddleware = require('../../controllers/auth.middleware');

router.get('/', [
  ArchaeologistsController.get
]);

router.post('/', [
  // must be logged into delegate account
  ArchaeologistsController.add,
  // AuthMiddleware.validJWTNeeded
]);

router.get('/:id', [
  ArchaeologistsController.getById
]);

module.exports = router;
