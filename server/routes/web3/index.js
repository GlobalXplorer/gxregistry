const express = require('express');
      router = express.Router();

const Web3Controller = require('../../controllers/web3');

router.get('/', (req, res) => {
  res.send({
    location: "web3",
    status:"alive"
  });
});
router.get('/address', [Web3Controller.addresses]);
router.get('/address/:id', [Web3Controller.addressById]);
router.get('/address/:id/balance', [Web3Controller.balance]);
router.get('/deploy', [Web3Controller.deploy]);

module.exports = router;
