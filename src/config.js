const toml = require('toml');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('redi');
debug.enabled = true;

/**
 * @typedef {object} RediConfig
 * @property {number} [version]
 * @property {string} default
 * @property {object[]} redirects
 * @property {string} redirects.hostname
 * @property {string} redirects.default
 */
const CURRENT_VERSISON = 2;

/**
 * Upgrades a config file to the current version.
 * @param {*} config
 * @returns {RediConfig} 
 */
function upgrade(config) {
  // Discover version.
  if (!config.version) config.version = CURRENT_VERSISON;

  // Upgrade.
  if (config.version == CURRENT_VERSISON) {
    return config;
  }
  else if (config.version == 1) {
    debug('Upgrading Config: v1 -> v2');
    config.redirects.hostname = '*';
    config.redirects = [config.redirects]
    config.version = 2;
    return config;
  }
  else {
    return null;
  }
}

const localPath = path.join(__dirname, '../config.local.toml');
const prodPath = path.join(__dirname, '../config.toml');

let tomlData = null;
if (fs.existsSync(localPath)) {
  tomlData = fs.readFileSync(localPath, 'utf8');
  debug('Loading config.local.toml...');
}
else if (fs.existsSync(prodPath)) {
  tomlData = fs.readFileSync(prodPath, 'utf8');
  debug('Loading config.toml...');
}
else {
  debug('Couldn\'t find configuration file.');
  process.exit(1);
}
const config = upgrade(toml.parse(tomlData));
if (config) {
  debug('%O', config);
  module.exports = config;
}
else {
  debug('Configuration file is using an incompatable version.', );
  process.exit(1);
}

module.exports = config;