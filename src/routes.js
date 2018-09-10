const router = require('express').Router();
const validate = require('./controllers/middleware/validation');
const user = require('./controllers/user');
const health = require('./controllers/health');
const hello = require('./controllers/hello');

router.post('/', user.validator.register, validate, user.register);
router.get('/health', health);
router.get('/hello', hello);

module.exports = router;
