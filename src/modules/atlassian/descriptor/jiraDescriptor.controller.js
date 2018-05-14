const { getConfig } = require('src/config');
const debug = require('debug')('sam:jira');

const jiraDescriptor = (req, res) => {
  const descriptor = Object.assign({}, getConfig('atlassian:templates:jiraDescriptor'));
  debug('Descriptor: ', descriptor, getConfig());
  descriptor.baseUrl = getConfig('baseUrl');

  res
    .set('Content-Type', 'application/json')
    .json(descriptor);
};

module.exports = jiraDescriptor;
