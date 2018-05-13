const debug = require('debug')('sam:callbacks');
const { setConfig } = require('src/config');

const addonInstalled = (req, res) => {
  const addonInfo = req.body;
  debug('Pobot addon installed', req.body);
  setConfig(addonInfo.baseUrl, addonInfo);
  res.send('done');
};

module.exports = addonInstalled;
