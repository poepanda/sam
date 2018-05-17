const RouteDigger = require('src/utils/routeDigger');

module.exports = function endpoints(req, res) {
  // eslint-disable-next-line
  const routeDigger = new RouteDigger(req.app._router.stack);
  res.json(routeDigger.getRoutesJSON());
};
