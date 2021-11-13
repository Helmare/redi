const toml = require('toml');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('redi');
debug.enabled = true;

/**
 * @typedef {object} RediConfig
 * @property {number} [version]
 * @property {object} redirects
 * @property {string} redirects.default
 */
const CURRENT_VERSISON = 1;

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
  else {
    return null;
  }
}

debug('Loading config.toml...');
const tomlData = fs.readFileSync(path.join(__dirname, '../config.toml'), 'utf8');
const config = upgrade(toml.parse(tomlData));

if (config) {
  debug('%O', config);
  module.exports = config;
}
else {
  debug('Failed to load config from: %s', tomlData);
  process.exit(1);
}

module.exports = config;