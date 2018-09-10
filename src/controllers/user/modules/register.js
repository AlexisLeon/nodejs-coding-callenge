const User = require(`${__app}/models/user`);
const { encrypt } = require(`${__app}/utils/encryption`);
const {
  ApiError,
  errorTypes,
  sendApiError,
} = require('../../middleware/api');

module.exports = function (req, res) {
  const user = {
    username: req.body.email,
    password: null,
    name: req.body.name,
  };

  return User.findOne({
    username: user.username,
  })
    .then((result) => {
      if (result) {
        return Promise.reject(
          new ApiError('User already exists', { type: errorTypes.INVALID_REQUEST_ERROR }),
        );
      }
    }).then(() => {
      user.password = encrypt(req.body.password);

      return User.create(user)
        .then(newUser => Promise.resolve(newUser))
        .catch(err => Promise.reject(err));
    })
    .then(newUser => sendApiResponse(res, {
      id: newUser._id,
      email: newUser.username,
      name: newUser.name,
      created: newUser.createdAt,
      updated: newUser.updatedAt,
    }))
    .catch((err) => sendApiError(res, err));
};
