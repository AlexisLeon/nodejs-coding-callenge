const User = require(`${__app}/models/user`);
const { encrypt } = require(`${__app}/utils/encryption`);

module.exports = function (req, res) {
  const user = {
    username: req.body.email,
    password: null,
    name: req.body.name,
  };

  return User.findOne({
    email: user.email,
  })
    .then((result) => {
      if (result) {
        return Promise.reject(res.status(400).json({
          message: 'User already exists',
        }));
      }
    }).then(() => {
      user.password = encrypt(req.body.password);

      return User.create(user)
        .then(newUser => Promise.resolve(newUser))
        .catch(err => Promise.reject(err));
    })
    .then(newUser => res.json({
      id: newUser._id,
      email: newUser.username,
      name: newUser.name,
      created: newUser.createdAt,
      updated: newUser.updatedAt,
    }))
    .catch(err => Promise.reject(err));
};
