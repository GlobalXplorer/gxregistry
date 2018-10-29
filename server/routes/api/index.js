const express = require('express');
      router = express.Router();

const APIController = require('../../controllers/api');

router.get('/', [APIController.test]);

module.exports = router;
