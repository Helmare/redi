const config = require('./config');
const express = require('express');
const hostRouter = require('./host-router');
const redirect = require('./redirect');
const debug = require('debug')('redi');
debug.enabled = true;

// Setup app
const app = express();
app.use(require('helmet')());

config.redirects.forEach(redi => {
  debug('Building host: %s', redi.hostname);
  const router = hostRouter(redi.hostname);
  Object.keys(redi).forEach(path => {
    if (path == 'default' || path == 'hostname') return; // Ignore default.
  
    debug('Installing redirect: %s => %s', path, redi[path]);
    router.all(path, redirect(redi[path]));
  });
  app.use(router);
  debug ('Installing host: %s', redi.hostname);
});
debug('Finished installing hosts.');

// // Setup redirects
// Object.keys(config.redirects).forEach(path => {
//   if (path == "default") return; // Ignore default.

//   debug('Installing redirect: %s => %s', path, config.redirects[path]);
//   app.all(path, redirect(config.redirects[path]));
// });

// Fallback
if (config.default) {
  debug('Installing global redirect: * => %s', config.default);
  app.use(redirect(config.default));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug('Listening to port %d...', port);
});