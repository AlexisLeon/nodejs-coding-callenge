const conf = require('nconf');

conf.file(`${__app}/config/config.json`);

const environment = process.env.NODE_ENV || conf.get('app:environment');
const production = environment === 'production' || environment === 'stage';

// Load env variables
if (production) {
  conf.set('app:port', process.env.PORT);
  conf.set('app:environment', environment);
  conf.set('oauth:secretKey', process.env.ENCRYPTION_KEY);

  conf.set('mongo:database', process.env.MONGO_DB_NAME);
  conf.set('mongo:username', process.env.MONGO_USERNAME);
  conf.set('mongo:password', process.env.MONGO_PASSWORD);
  conf.set('mongo:host', process.env.MONGO_HOSTNAME);
  conf.set('mongo:port', process.env.MONGO_PORT);
}

if (environment === 'test') {
  conf.set('app:port', process.env.PORT || conf.get('app:port'));
  conf.set('app:environment', environment);
}

module.exports = conf;
