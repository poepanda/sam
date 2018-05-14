const { MongoClient } = require('mongodb');
const Promise = require('bluebird');
const debug = require('debug')('sam:database');
const { getConfig } = require('src/config');

const {
  PROTOCOL,
  HOST,
  PORT,
  USERNAME,
  PASSWORD,
  DB,
} = getConfig('MONGODB');

const URL = `${PROTOCOL}://${USERNAME ? `${USERNAME}:${PASSWORD}@` : ''}${HOST}${PORT ? `:${PORT}` : ''}`;

const connect = () => (
  new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, client) => {
      debug('connect DB', URL);
      if (err) return reject(err);
      if (!client) {
        debug('Cannot connect to database!');
        return reject(new Error({ message: 'Cannot connect to database!' }));
      }
      const db = client.db(DB);
      debug('Database connected');
      return resolve(db);
    });
  })
);

module.exports = {
  connect,
};
