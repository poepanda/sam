const express = require('express');
const debug = require('debug')('sam:landing');

const { getConfig } = require('src/config');

const router = express.Router();

router.get('/', (req, res) => {
  debug(getConfig('baseUrl'));
  res.render('home.html', { baseUrl: getConfig('baseUrl') });
});

module.exports = router;
