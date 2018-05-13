const debug = require('debug')('sam:jira');
const jiraComment = require('./jiraComment');

const commentBuildNotice = (req, res, next) => {
  const comment = jiraComment(req.body);
  comment
    .then((data) => {
      debug(data);
      res.send('Commented!');
    })
    .catch((err) => {
      debug(err);
      next(err);
    });
};

module.exports = commentBuildNotice;
