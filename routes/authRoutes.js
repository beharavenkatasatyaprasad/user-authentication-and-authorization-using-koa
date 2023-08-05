const Router = require('koa-router');
const authController = require('../controllers/authController');

const router = new Router();

router.post('/signup', authController.signupUser);

module.exports = router;