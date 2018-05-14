const express = require('express');

const router = express.Router();

const routeDescriptor = require('./descriptor/descriptor.route');
const routeJira = require('./jira/jira.route');
const routeCallbacks = require('./callbacks/callbacks.route');

router.use('/descriptor', routeDescriptor);
router.use('/jira', routeJira);
router.use('/callbacks', routeCallbacks);

module.exports = router;
