const { body } = require('express-validator/check');

// TODO: Format error messages from dictionary
// Instead of writing on every param validation
//      .withMessage('Invalid name param: must not be empty.')
// error message must be formated from a dictionary:
//      .withMessage(invalid_empty('name')) -> Invalid name param: must not be empty.

/**
 * Register - Validate register route
 * @route POST /
 *
 * @return {Response}
 */
module.exports = [
  body('email')
    .exists()
    .withMessage('email param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid email param: must not be empty.')
    .isEmail()
    .withMessage('email param must be a valid email.'),
  body('password')
    .exists()
    .withMessage('password param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid password param: must not be empty.'),
  body('name')
    .exists()
    .withMessage('name param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid name param: must not be empty.'),
];
