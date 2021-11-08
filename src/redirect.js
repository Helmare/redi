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
    let _to = to;
    Object.keys(req.params).forEach(param => {
      _to = _to.replace(':' + param, req.params[param]);
    });
    
    debug('Redirecting: %s => %s', req.url, _to);
    res.redirect(_to);
  }
};