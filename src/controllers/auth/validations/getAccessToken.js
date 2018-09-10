const { body } = require('express-validator/check');

/**
 * Authorize - Get Access Token
 * @route POST /auth
 *
 * @return {Response}
 */
module.exports = [
  body('grant_type')
    .exists()
    .withMessage('grant_type param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid grant_type param: must be `password`.'),
  body('password')
    .exists()
    .withMessage('password param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid password param: must not be empty.')
    .isString()
    .withMessage('Invalid password param: must be a string.'),
  body('username')
    .exists()
    .withMessage('username param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid username param: must not be empty.')
    .isString()
    .withMessage('Invalid username param: must be a string.'),
];
