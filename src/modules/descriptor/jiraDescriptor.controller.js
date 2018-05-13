const { getConfig } = require('src/config');


module.exports = function jiraDescriptor(req, res) {
  const descriptor = Object.assign({}, getConfig('templates').jira);
  descriptor.baseUrl = getConfig('baseUrl');

  res.json(descriptor);
};
