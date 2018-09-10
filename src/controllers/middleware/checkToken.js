const validator = require('validator');
const { ApiError, errorTypes } = require('./api');
const accessToken = require('../../models/accessToken');

module.exports = (req, res, next) => {
  const validationErrors = isValidRequest(req);
  if (validationErrors instanceof ApiError) throw validationErrors;
  // Check if token exists
  return accessToken.findOne({
    accessToken: req.header.Authorization
  }).populate('user')
    .then((token) => {
      if (!token) return Promise.reject(new ApiError('Invalid token', {
        type: errorTypes.AUTHENTICATION_ERROR,
      }));

      // Save user for later use in request
      res.locals.user = token.user;
      res.locals.decoded = token;
      next();
    })
    .catch(err => next(err));
};

function isValidRequest(req) {
  const header = req.headers.authorization;
  if (!header) return new ApiError('Authorization header is required.', { type: errorTypes.AUTHENTICATION_ERROR });
  if(validator.isEmpty(header)) return new ApiError('Invalid Authorization header: must not be empty.', { type: errorTypes.AUTHENTICATION_ERROR });
  if(!validator.isUUID(header, 4)) return new ApiError('Authorization header must be a valid uuid.', { type: errorTypes.AUTHENTICATION_ERROR });
  return true
}
