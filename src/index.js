/**
 * @typedef {object} RediConfig
 * @property {object} redirects
 * @property {string} redirects.default
 */
require('dotenv').config();
const express = require('express');
const toml = require('toml');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('redi');

// Load config
debug('Loading config.toml...');
const tomlData = fs.readFileSync(path.join(__dirname, '../config.toml'), 'utf8');
/** @type {RediConfig} */
const config = toml.parse(tomlData);
debug('%O', config);

// Setup app
const app = express();
app.use(require('helmet')());

// Setup redirects
Object.keys(config.redirects).forEach(path => {
  if (path == "default") return; // Ignore default.

  debug('Setting up redirect: %s => %s', path, config.redirects[path]);
  app.all(path, (req, res) => {
    res.redirect(config.redirects[path]);
  });
});

// Fallback
if (config.redirects.default) {
  debug('Setting up fallback redirect to: %s', config.redirects.default);
  app.use((req, res) => {
    res.redirect(config.redirects.default);
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug('Listening to port %d...', port);
});