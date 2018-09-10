const request = require('supertest');
const app = require('../../server');
const { credentials } = require('../config');

let headers;
let endpoint;
let body;

describe('Register user', () => {
  beforeAll(() => {
    endpoint = '/';
  });

  beforeEach(() => {
    headers = {};
    body = {
      email: credentials.username,
      password: credentials.password,
      name: credentials.name,
    };
  });

  test('Should create user', () => request(app)
    .post(endpoint)
    .set(headers)
    .send(body)
    .expect(200)
    .then((res) => {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('email');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('created');
      expect(res.body).toHaveProperty('updated');
    }));

  test('Should not create user with existing email', () => {
    // Create user to override
    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .then(() => request(app)
        .post(endpoint)
        .set(headers)
        .send(body)
        .expect(400)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('error');
          expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
        })
      )
  });

  describe('Should return error when required fields are missing', () => {
    const testCases = [
      { description: 'email is undefined', before: () => { delete body.email; } },
      { description: 'name is undefined', before: () => { delete body.name; } },
      { description: 'password is undefined', before: () => { delete body.password; } },
    ];

    testCases.forEach((testCase) => {
      test(testCase.description, () => {
        testCase.before();

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
  });

  describe('Should return error when required fields are empty', () => {
    const testCases = [
      { description: 'email is empty', before: () => { body.email = null; } },
      { description: 'name is empty', before: () => { body.name = null; } },
      { description: 'password is empty', before: () => { body.password = null; } },
    ];

    testCases.forEach((testCase) => {
      test(testCase.description, () => {
        testCase.before();

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
  });

  describe('Should return error when fields are invalid', () => {
    const testCases = [
      { description: 'email is not a string', before: () => { body.email = 1234; } },
      { description: 'email invalid format', before: () => { body.email = 'abcd'; } },
      { description: 'name is not a string', before: () => { body.name = 1234; } },
      { description: 'password is not a string', before: () => { body.password = 1234; } },
    ];

    testCases.forEach((testCase) => {
      test(testCase.description, () => {
        testCase.before();

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
  });
});
