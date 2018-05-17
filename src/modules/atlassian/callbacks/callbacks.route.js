const express = require('express');

const router = express.Router();

const addonInstalled = require('./addonInstalled.controller');

router.post('/addon-installed', addonInstalled);

module.exports = router;
