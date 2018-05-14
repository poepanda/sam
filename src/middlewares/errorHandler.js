const debug = require('debug')('sam:error');

const errorHandler = (err, req, res) => {
  if (err) {
    debug('Error', JSON.stringify(err, null, 2));
    res.status(500).json({
      message: err.message ? err.message : 'something went wrong!',
    });
  }
};

module.exports = errorHandler;
