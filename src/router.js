const express = require('express');

const router = express.Router();

const routeLanding = require('./modules/landing/landing.route');
const routeConfig = require('./modules/config/config.route');
const routeNotFound = require('./modules/others/notFound');
const routeAtlassian = require('./modules/atlassian/atlassian.route');

router.use('/', routeLanding);
router.get('/health', (req, res) => res.status(200).send('Im good'));
router.use('/config', routeConfig);
router.use('/atlassian', routeAtlassian);
router.use(routeNotFound);

module.exports = router;
