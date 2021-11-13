const toml = require('toml');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('redi');
debug.enabled = true;

/**
 * @typedef {object} RediConfig
 * @property {number} [version=1]
 * @property {object} redirects
 * @property {string} redirects.default
 */

const DEFAULT_CONFIG = {
  version: 1
}

debug('Loading config.toml...');
const tomlData = fs.readFileSync(path.join(__dirname, '../config.toml'), 'utf8');
/** @type {RediConfig} */
const config = { ...DEFAULT_CONFIG, ...toml.parse(tomlData) };
debug('%O', config);

module.exports = config;