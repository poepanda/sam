const jwt = require('atlassian-jwt');
const moment = require('moment');
const request = require('request');
const debug = require('debug')('sam:jira');
const Promise = require('bluebird');

const { getConfig } = require('src/config');

/**
 * To post a comment to Atlassian - Jira ticket
 * @Request - POST
 * data
 * - atlassianId: the jira Url of your project
 * - ticketId: ID of target ticket
 * - body: Content of the comment
 */
const jiraComment = ({ atlassianId, ticketId, body }) => (
  new Promise((resolve, reject) => {
    if (!atlassianId || !ticketId || !body) {
      reject(new Error({ message: 'Missing required field!' }));
    }

    const now = moment().utc();
    const commentPath = `/rest/api/2/issue/${ticketId}/comment`;
    const jiraConfig = getConfig(`atlassian:jira.${atlassianId}`);

    // Used by [Query String Hash](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt/#a-name-qsh-a-creating-a-query-string-hash)
    const requestForHash = {
      method: 'POST',
      originalUrl: commentPath,
    };
    debug('using config: ', jiraConfig);

    const claims = {
      iss: jiraConfig.key,
      iat: now.unix(), // the time the token is generated
      exp: now.add(3, 'minutes').unix(), // token expiry time (recommend 3 minutes after issuing)
      qsh: jwt.createQueryStringHash(requestForHash), //
    };

    const token = jwt.encode(claims, jiraConfig.sharedSecret);
    debug('token: ', token);

    request.post({
      url: `${jiraConfig.baseUrl}${commentPath}`,
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: { body },
      json: true,
    }, (err, response, data) => {
      const { statusCode, statusMessage } = response;
      debug('Response summary: ', statusCode, statusMessage);

      if (statusCode !== 200) {
        reject(new Error({
          message: JSON.stringify({ statusCode, statusMessage }),
        }));
      }

      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
);

module.exports = jiraComment;
