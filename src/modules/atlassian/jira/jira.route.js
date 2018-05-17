const express = require('express');

const router = express.Router();

const commentBuildNotice = require('./commentBuildNotice.controller');

router.post('/comment-build-notice', commentBuildNotice);

module.exports = router;
