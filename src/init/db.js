const mongoose = require('mongoose');
const conf = require('../config');

const host = conf.get('mongo:host')
const database = conf.get('mongo:database')
const username = conf.get('mongo:username')
const password = conf.get('mongo:password')
const credentials = (password && username) && `${username}:${password}@`
const uri = `mongodb://${credentials}${host}/${database}`

const config = {
  useNewUrlParser: true,
  poolSize: 4
}

mongoose.Promise = global.Promise;
mongoose.connect(uri, config, (err, db) => {
  if(err) console.log(err.message);
  else if (db.readyState == 1){
    console.log('Mongo DB: Connection has been established successfully.');
  }
});

module.exports = {
  db: mongoose.connection,
  Mongo: mongoose,
  Schema: mongoose.Schema,
  close: () => db.close(),
}
