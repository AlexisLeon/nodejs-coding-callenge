const request = require('supertest');
const app = require('./../server');
const config = require('./config');
const { db } = require('../src/init/db');

beforeAll((done) => {
  db.dropDatabase();
  done()
});

beforeEach((done) => {
  db.dropDatabase();
  done();
});
