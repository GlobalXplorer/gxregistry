const express = require('express');
      router = express.Router();

const APIController = require('../../controllers/api');

router.get('/', (req, res) => {
  res.send({"status": "alive"});
});

module.exports = router;
