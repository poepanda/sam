const debug = require('debug')('sam:error');

module.exports = function errorHandler(err, req, res) {
  if (err) {
    debug(err);
    res.status(500).json({
      message: err.message ? err.message : 'something went wrong!',
    });
  }
};
