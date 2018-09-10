const router = require('express').Router();
const validate = require('./controllers/middleware/validation');
const user = require('./controllers/user');
const health = require('./controllers/health');
const hello = require('./controllers/hello');
const auth = require('./controllers/auth');

router.post('/', user.validator.register, validate, user.register);
router.get('/health', health);
router.get('/hello', hello);
router.post('/auth', auth.validator.getAccessToken, validate, auth.getAccessToken);

module.exports = router;
