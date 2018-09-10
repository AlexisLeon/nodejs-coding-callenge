const request = require('supertest');
const app = require('../../server');
const { credentials } = require('../config');

let headers;
let endpoint;
let body;

describe('Get access token', () => {
  beforeAll(() => {
    endpoint = '/auth';
  });

  beforeEach(() => {
    headers = {
      // Authorization: credentials.basicAuth,
      'Content-Type': 'application/json',
    };

    body = {
      grant_type: 'password',
      username: credentials.username,
      password: credentials.password,
    };

    // Create user to authenticate
    return request(app)
      .post('/')
      .send({
        email: credentials.username,
        password: credentials.password,
        name: credentials.name,
      })
  });

  test('Should return access token for authorized user', done =>
    request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
        expect(res.body).toHaveProperty('expiresIn');
        // expect(res.body).toHaveProperty('scope');

        global.TEST_ACCESSTOKEN = res.body.accessToken;
        global.TEST_REFRESHTOKEN = res.body.refreshToken;

        done();
      }));

  test('Should return error when username is wrong', () => {
    body.username = 'tests@norde.mx';

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });

  test('Should return error when password is wrong', () => {
    body.password = 'passwd';

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });

  test('Should return error when username is invalid email', () => {
    body.username = 'tests';

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });

  test('Should return error when username is empty', () => {
    body.username = '';

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });

  test('Should return error when password is empty', () => {
    body.password = '';

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });

  test('Should return error when username is missing', () => {
    delete body.username;

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });

  test('Should return error when password is missing', () => {
    delete body.password;

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });
});
