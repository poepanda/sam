const express = require('express');

const router = express.Router();

const routeLanding = require('./modules/landing/landing.route');
const routeConfig = require('./modules/config/config.route');
const routeDescriptor = require('./modules/descriptor/descriptor.route');
const routeJira = require('./modules/jira/jira.route');
const routeCallbacks = require('./modules/callbacks/callbacks.route');
const routeNotFound = require('./modules/others/notFound');


router.use('/', routeLanding);
router.use('/config', routeConfig);
router.use('/descriptor', routeDescriptor);
router.use('/jira', routeJira);
router.use('/callbacks', routeCallbacks);
router.use(routeNotFound);

module.exports = router;
