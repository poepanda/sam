const express = require('express');

const router = express.Router();

const addonInstalled = require('./addonInstalled.controller');

router.use('/addon-installed', addonInstalled);

module.exports = addonInstalled;
