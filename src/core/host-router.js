const express = require('express');
const isMatch = require('wildcard');
const debug = require('debug')('redi');
debug.enabled = true;

/**
 * Creates a router which only allows requests
 * which match the hostname.
 * 
 * @param {string} hostname
 * @return {express.IRouter}
 */
module.exports = function(hostname) {
  const router = express.Router();
  router.use((req, res, next) => {
    if (isMatch(hostname, req.headers.host)) {
      next();
    }
    else {
      next('router');
    }
  });
  return router;
}