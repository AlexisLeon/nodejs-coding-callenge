global.__app = __dirname + '/src';

const express = require('express');
const conf = require('./src/config');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || conf.get('app:environment');
const isProduction = environment === 'production' || environment === 'stage';

const app = express();

// CONFIGURE APP
app.use(morgan(conf.get('app:log')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// HANDLE ERRORS
process.on('uncaughtException', (error) => {
  console.log(error.stack);
});

app.use('/', require('./src/routes'))
app.use('/health', require('./src/controllers/health'))
app.use('*', (req, res) => {
  res.json({
    hello: 'world',
  });
});

if (environment !== 'test') {
  app.listen(conf.get('app:port'), () => {
    console.log(`App started at port: ${conf.get('app:port')}`);
  });
}

module.exports = app;
