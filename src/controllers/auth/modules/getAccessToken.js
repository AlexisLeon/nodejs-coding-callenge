const uuidv4 = require('uuid/v4');
const User = require(`${__app}/models/user`);
const AccessToken = require(`${__app}/models/accessToken`);
const RefreshToken = require(`${__app}/models/refreshToken`);
const { decrypt } = require(`${__app}/utils/encryption`);
const config = require(`${__app}/config`);
const {
  ApiError,
  errorTypes,
  sendApiError,
  sendApiResponse,
} = require('../../middleware/api');

// TODO: Modularize -> Generate uuid, save/update token, ...
module.exports = function (req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  return User.findOne({
    username: user.username,
  })
    .then((result) => {
      console.log(user, result);

      // TODO: Check token client
      if (!result) {
        return Promise.reject(
          new ApiError('Invalid username', { type: errorTypes.INVALID_REQUEST_ERROR }),
        );
      }

      if (user.password !== decrypt(result.password)) {
        return Promise.reject(
          new ApiError('Invalid password', { type: errorTypes.INVALID_REQUEST_ERROR }),
        );
      }

      return result
    }).then((result) => {
      const accessTokenDocument = { accessToken: uuidv4(), expiresIn: config.get('oauth:expiresIn') };
      const refreshTokenDocument = { refreshToken: uuidv4(), expiresIn: config.get('oauth:expiresIn') };
      const tokenQuery = { user: result.id };
      const queryOptions = {
        upsert: true,
        new: true, // Update or insert (token)
        runValidators: true,
      };

      // New access token
      return AccessToken.findOneAndUpdate(tokenQuery, accessTokenDocument, queryOptions)
        .then(({ accessToken, expiresIn }) => {

          // New refresh token
          return RefreshToken.findOneAndUpdate(tokenQuery, refreshTokenDocument, queryOptions)
            .then(({ refreshToken}) => Promise.resolve({ // Build object to send as response
              refreshToken,
              accessToken,
              expiresIn,
            }))
            .catch(err => Promise.reject(err));

        })
        .catch(err => Promise.reject(err));
    })
    .then(token => sendApiResponse(res, {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      expiresIn: config.get('oauth:expiresIn'),
      // TODO: Token scope
    }))
    .catch((err) => sendApiError(res, err));
};
