const express = require('express');

const router = express.Router();

const baseUrl = require('./baseUrl.controller');

router.use('/base-url', baseUrl);

module.exports = router;
