const toml = require('toml');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('redi');
debug.enabled = true;

debug('Loading config.toml...');
const tomlData = fs.readFileSync(path.join(__dirname, '../config.toml'), 'utf8');
/** @type {RediConfig} */
const config = toml.parse(tomlData);
debug('%O', config);

module.exports = config;