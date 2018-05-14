const { setConfig } = require('src/config');

const baseUrlController = (req, res) => {
  setConfig('baseUrl', req.headers.origin);
  res.redirect('/');
};

module.exports = baseUrlController;
