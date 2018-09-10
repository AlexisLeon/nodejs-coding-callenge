global.__app = __dirname + '/src';

const express = require('express');
const conf = require('./src/config');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const bodyParser = require('body-parser');

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
    hello: 'world'
  })
});

app.listen('3000', () => {
    console.log('App started at port: 3000');
});

module.exports = app;
