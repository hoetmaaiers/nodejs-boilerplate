const express = require('express');
const { version } = require('../helpers/version.helper');

const router = express.Router();

router.get('/version', (req, res) => {
  res.set('Content-Type', 'text/plain');
  return res.status(200).send(version);
});

router.get('/status', (req, res) => res.status(204).send());

router.use('/dummies', require('./dummy.routes'));
// ...

module.exports = router;
