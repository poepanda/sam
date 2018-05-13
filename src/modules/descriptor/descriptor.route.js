const express = require('express');

const router = express.Router();

const jiraDescriptor = require('./jiraDescriptor.controller');

router.get('/jira', jiraDescriptor);

module.exports = router;
