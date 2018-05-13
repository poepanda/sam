const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV;
const configFile = path.join(__dirname, env ? `${env}.config.json` : 'config.json');

let config = {};

function storeConfig() {
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
}

fs.exists(configFile, (exists) => {
  if (exists) {
    const jsonConfig = fs.readFileSync(configFile);
    config = JSON.parse(jsonConfig || {});
  } else {
    storeConfig();
  }
});

module.exports = {
  setConfig: (key, value) => {
    config[key] = value;
    storeConfig();
  },
  getConfig: key => config[key],
};
