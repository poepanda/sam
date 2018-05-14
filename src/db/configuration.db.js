const { connect } = require('./index');
const debug = require('debug')('sam:database');
const { setDefaultConfig, getConfig } = require('src/config');

const PERSISTED_CONFIGS = ['atlassian'];

const fetchConfig = () => (
  connect()
    .then((db) => {
      const configCollection = db.collection('configuration');
      return configCollection.findOne({ origin: getConfig('baseUrl') });
    })
    .catch((err) => {
      debug('Error while fetching config from database ', err.toString());
    })
);

const saveConfig = () => (
  connect()
    .then((db) => {
      const configCollection = db.collection('configuration');
      const config = {};

      PERSISTED_CONFIGS.map((key) => {
        config[key] = getConfig(key);
        return true;
      });

      debug('Config to save: ', config);
      return configCollection.save({
        _id: getConfig('_id'),
        origin: getConfig('baseUrl'),
        config,
      })
        .then((result) => {
          debug('Saved! Result: ', result);
        });
    })
    .catch((err) => {
      debug('Error while saving config to database ', err.toString());
    })
);

const migrateConfig = () => {
  fetchConfig().then((result) => {
    debug('MIGRATED CONFIG! Result: ', result);
    setDefaultConfig(result ?
      {
        ...result.config,
        _id: result['_id'], // eslint-disable-line
      } :
      {});
  });
};

module.exports = {
  fetchConfig,
  saveConfig,
  migrateConfig,
};
