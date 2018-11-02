const express = require('express');
      router = express.Router();

const ArtifactsController = require('../../controllers/artifacts');
const AuthMiddleware = require('../../controllers/auth.middleware');

router.get('/', [
  ArtifactsController.get
]);

router.post('/', [
  ArtifactsController.create,
  // AuthMiddleware.validJWTNeeded
]);

router.get('/:id', [
  ArtifactsController.getById
]);

router.put('/:id/relocate', [
  ArtifactsController.relocate,
  // AuthMiddleware.validJWTNeeded
]);

module.exports = router;
