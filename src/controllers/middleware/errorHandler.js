const {
  ApiError,
  errorTypes,
  sendApiError,
} = require(`${__app}/controllers/middleware/api`);

module.exports = (err, req, res, next) => {
  // Handle express, node libs, etc. errors
  if (err instanceof SyntaxError && err.status === 400) {
    return sendApiError(res, new ApiError('Invalid JSON received', {
      ...err,
      type: errorTypes.INVALID_REQUEST_ERROR,
    }));
  }

  return sendApiError(res, err);
};
