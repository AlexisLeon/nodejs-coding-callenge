const {
  ApiError,
  errorTypes,
  sendApiError,
  sendApiResponse,
} = require(`${__app}/controllers/helpers/api`);
const getAccessToken = require('./getAccessToken');
const refreshAccessToken = require('./refreshAccessToken');

/**
 * Authorize - Get or Refresh Access Token
 * @route POST /auth
 *
 * @return {Response}
 */
module.exports = function (req, res) {
  return Promise.resolve()
    .then(createUser(req, res))
    .then(response => sendApiResponse(res, response))
    .catch(err => sendApiError(res, err));
};
