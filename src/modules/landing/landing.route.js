const express = require('express');

const { getConfig } = require('src/config');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(getConfig('baseUrl'));
  res.render('home.html', { baseUrl: getConfig('baseUrl') });
});

module.exports = router;
