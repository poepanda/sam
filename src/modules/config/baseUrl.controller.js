const { setConfig } = require('src/config');

module.exports = function baseUrlController(req, res) {
  setConfig('baseUrl', req.headers.origin);
  res.redirect('/');
};
