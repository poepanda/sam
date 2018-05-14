const path = require('path');
// const debug = require('debug')('sam:config');
const nconf = require('nconf');

const env = nconf.get('NODE_ENV');

nconf
  // .argv()
  .env()
  .file(
    'main',
    path.join(
      __dirname,
      `./main${(env && env !== 'development') ? `.${env}` : ''}.json`,
    ),
  )
  .file('env', path.join(__dirname, './envvar.json'))
  .file('local', path.join(__dirname, './local.json'));

const storeConfig = () => {
  nconf.save();
};

module.exports = {
  setConfig: (key, value) => {
    nconf.set(key, value);
    storeConfig();
  },
  getConfig: key => nconf.get(key),
  setDefaultConfig: config => nconf.defaults(config),
};
