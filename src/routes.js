const router = require('express').Router();
const validate = require('./controllers/middleware/validation');
const user = require('./controllers/user');
const health = require('./controllers/health');

router.post('/', user.validator.register, validate, user.register);
router.get('/health', health);

module.exports = router;
