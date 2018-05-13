const jwt = require('atlassian-jwt');
const moment = require('moment');
const request = require('request');
// const debug = require('debug')('sam:jira');
const Promise = require('bluebird');

const { getConfig } = require('src/config');

module.exports = function jiraComment({ baseUrl, ticketId, body }) {
  return new Promise((resolve, reject) => {
    if (!baseUrl || !ticketId || !body) {
      reject(new Error({ message: 'Missing required field!' }));
    }

    const now = moment().utc();
    const commentPath = `/rest/api/2/issue/${ticketId}/comment`;
    const jiraConfig = getConfig(baseUrl);

    // Used by [Query String Hash](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt/#a-name-qsh-a-creating-a-query-string-hash)
    const requestForHash = {
      method: 'POST',
      originalUrl: commentPath,
    };

    const claims = {
      iss: jiraConfig.key,
      iat: now.unix(), // the time the token is generated
      exp: now.add(3, 'minutes').unix(), // token expiry time (recommend 3 minutes after issuing)
      qsh: jwt.createQueryStringHash(requestForHash), //
    };

    const token = jwt.encode(claims, jiraConfig.sharedSecret);

    request.post({
      url: `${baseUrl}${commentPath}`,
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: { body },
      json: true,
    }, (err, response, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
