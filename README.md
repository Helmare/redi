# redi
An [Express](https://expressjs.com/) redirect server, ready to fork and use on your domain.

## Setup
This repo is setup to run a redirect server right out of the box and plays well with *continuous deployment* services. Just fork the repo and tell your platform of choice to auto-deploy from the fork. Then update the `config.toml` on your fork to your specifications. An example config is provided in the [configuration](#configuration) section.

### Local Server
To run a local server, clone the forked repository and run the following commands:
```
npm i
npm start
```

## Configuration
```toml
#
# Config file version.
#
version=2
#
# The "default" redirect is used as a fallback. If none is
# provided, then the server will return a standard express
# 404 response.
#
default="https://hazdryx.me"

#
# All redirects are placed here. When a server is booting up it
# will load this and create express routes based on the keys and
# redirect to the value.
#
[[redirects]]
#
# The "hostname" allows you to control on which host the redirects 
# take affect. This accepts a wildcard at the start and end of the
# hostname and defaults to "*".
#
hostname="rd.*"
#
# These are the redirects for the specified hostname.
#
"/fiverr"="https://www.fiverr.com/hazdryx"
"/fiverr-cli"="https://www.fiverr.com/hazdryx/code-a-custom-nodejs-cli"

#
# GitHub redirect example.
#
[[redirects]]
hostname="git.*"
#
# Redirects can contain a default as well and is specific to that
# host.
#
default="https://github.com/hazdryx"
#
# Using ':' creates a paramter in your URL that will be transfered
# to the redirect.
#
"/:repo"="https://github.com/hazdryx/:repo"
```
