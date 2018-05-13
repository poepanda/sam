const express = require('express');
const http = require('http');
const path = require('path');
const debug = require('debug')('sam:server');
const error = require('http-errors');

require('app-module-path').addPath(__dirname);

const router = require('src/router');
const errorHandler = require('src/middlewares/errorHandler');
const normalizePort = require('src/utils/normalizePort');
const mustacheExpress = require('mustache-express');

const port = normalizePort(process.env.NODE_PORT || 3001);

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, './src/modules/landing/views'));

app.use('/', router);
app.use(errorHandler);

server.listen(port);

server.on('listening', () => {
  debug(`The app is ready on port ${port}`);
});

server.on('error', () => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

    // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
