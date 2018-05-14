const notFound = (req, res) => {
  res.status(404).send('Uhoh! Cannot find what you are looking for!');
};

module.exports = notFound;
