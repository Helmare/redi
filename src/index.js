const config = require('./config');
const express = require('express');
const hostRouter = require('./core/host-router');
const redirect = require('./core/redirect');
const debug = require('debug')('redi');
debug.enabled = true;

// Setup app
const app = express();
app.use(require('helmet')());

config.redirects.forEach(redi => {
  const router = hostRouter(redi.hostname);

  // Install host routes.
  Object.keys(redi).forEach(path => {
    if (path == 'default' || path == 'hostname') return; // Ignore default.
  
    debug('Installing redirect: %s%s => %s', redi.hostname, path, redi[path]);
    router.all(path, redirect(redi[path]));
  });

  // Install host default.
  if (redi.default) {
    debug('Installing redirect: %s/* => %s', redi.hostname, redi.default);
    router.use(redirect(redi.default));
  }

  app.use(router);
});

// Fallback
if (config.default) {
  debug('Installing redirect: * => %s', config.default);
  app.use(redirect(config.default));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug('Listening to port %d...', port);
});