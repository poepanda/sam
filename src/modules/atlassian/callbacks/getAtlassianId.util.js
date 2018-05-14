const debug = require('debug')('sam:atlassian');

module.exports = (url) => {
  const atlassianUrlRegex = /^((https|http){1}:\/\/){1}([\d\w]*)(.atlassian.net(\/)?)$/g;
  const matches = atlassianUrlRegex.exec(url);
  debug(matches[3]);
  return matches[3];
};
