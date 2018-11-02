const express = require('express');
      router = express.Router();

const APIController = require('../../controllers/api');

router.get('/', (req, res) => {
  res.send({
    location: "api",
    status: "alive"
  });
});

module.exports = router;
