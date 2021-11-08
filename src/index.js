/**
 * @typedef {object} RediConfig
 * @property {object} redirects
 * @property {string} redirects.default
 */
const config = require('./config.js');
const express = require('express');
const redirect = require('./redirect');
const debug = require('debug')('redi');
debug.enabled = true;

// Setup app
const app = express();
app.use(require('helmet')());

// Setup redirects
Object.keys(config.redirects).forEach(path => {
  if (path == "default") return; // Ignore default.

  debug('Installing redirect: %s => %s', path, config.redirects[path]);
  app.all(path, redirect(config.redirects[path]));
});

// Fallback
if (config.redirects.default) {
  debug('Installing redirect: * => %s', config.redirects.default);
  app.use(redirect(config.redirects.default));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug('Listening to port %d...', port);
});