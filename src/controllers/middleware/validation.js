const { validationResult } = require('express-validator/check');

/**
 * validate
 * @param req
 * @param res
 * @param next
 *
 * Each error returned by .array() and .mapped() methods have the following format by default:
 * {
 *   "msg": "The error message",
 *   "param": "param.name.with.index[0]",
 *   "value": "param value",
 *   // Location of the param that generated this error.
 *   // It's either body, query, params, cookies or headers.
 *   "location": "body",
 *
 *   // nestedErrors only exist when using the oneOf function
 *   "nestedErrors": [{ ... }]
 * }
 *
 */
module.exports = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const error = validationErrors.array()[0];

    return res.status(400).json({
      error: {
        message: error.msg,
        type: 'invalid_request_error',
        param: error.param,
      },
    });
  }

  next();
};
