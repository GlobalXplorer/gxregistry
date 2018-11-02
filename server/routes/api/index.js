const express = require('express');
      router = express.Router();

const APIController = require('../../controllers/api');
const accounts = require('../../data/accounts.json');

router.get('/', (req, res) => {
  res.send({
    location: "api",
    status: "alive"
  });
});

router.get('/accounts', (req, res) => {
  res.send(accounts);
})

module.exports = router;
