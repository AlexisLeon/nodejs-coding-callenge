const express = require('express');
const morgan = require('morgan');

const app = express();

// CONFIGURE APP
app.use(morgan('dev'));

// HANDLE ERRORS
process.on('uncaughtException', (error) => {
  console.log(error.stack);
});

app.use('*', (req, res) => {
    res.json({
        hello: 'world' 
    })
});

app.listen('3000', () => {
    console.log('App started at port: 3000');
});
