const debug = require('debug')('sam:callbacks');

const { setConfig } = require('src/config');
const { saveConfig } = require('src/db/configuration.db');
const getAtlassianId = require('./getAtlassianId.util');

const addonInstalled = (req, res) => {
  const addonInfo = req.body;
  debug('Sam addon installed', req.body);
  setConfig(
    `atlassian:jira.${getAtlassianId(addonInfo.baseUrl)}`,
    addonInfo,
  );

  debug('Start saving config to db...');
  saveConfig();
  res.send('done');
};

module.exports = addonInstalled;
