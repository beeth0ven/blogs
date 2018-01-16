var hasEnv = process.env.MONGO_PORT;
if (!hasEnv) {
  var env = require('node-env-file');
  env(__dirname + '/.env');
}

require('babel-core/register');
require('babel-polyfill');
require('./server');