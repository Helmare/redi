const debug = require('debug')('redi');
debug.enabled = true;

/**
 * Creates a redirect request handler.
 * 
 * @param {string} to
 * @returns {import('express').RequestHandler}
 */
module.exports = function redirect(to) {
  return (req, res) => {
    debug('Redirecting: %s => %s', req.url, to);
    res.redirect(to);
  }
};