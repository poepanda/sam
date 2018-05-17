const map = require('lodash/map');

function split(thing) {
  if (typeof thing === 'string') {
    return thing.split('/');
  } else if (thing.fast_slash) {
    return '';
  }
  const match = thing.toString()
    .replace('\\/?', '')
    .replace('(?=\\/|$)', '$')
    .match(/^\/\^((?:\\[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/])*)\$\//);
  return match ?
    match[1].replace(/\\(.)/g, '$1').split('/') :
    `<complex: ${thing.toString()} >`;
}

function getRoute(path, layer) {
  if (layer.route) {
    return map(layer.route.stack, getRoute.bind(this, path.concat(split(layer.route.path))));
  } else if (layer.name === 'router' && layer.handle.stack) {
    return map(layer.handle.stack, getRoute.bind(this, path.concat(split(layer.regexp))));
  } else if (layer.method) {
    this.routes.push({
      method: layer.method.toUpperCase(),
      path: path.concat(split(layer.regexp)).filter(Boolean).join('/'),
    });
  }
  return null;
}

module.exports = class routeDigger {
  constructor(stack) {
    this.stack = stack;
  }

  getRoutesJSON() {
    this.routes = [];
    map(this.stack, getRoute.bind(this, []));
    return this.routes;
  }
};
