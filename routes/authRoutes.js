const Router = require('koa-router');
const authController = require('../controllers/authController');

const router = new Router();

router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);

router.get('/protected', authController.verifyToken, async (ctx) => {
  const user = ctx.state.user;
  ctx.body = { message: `Hello ${user.username}! This is a protected route.` };
});
module.exports = router;
