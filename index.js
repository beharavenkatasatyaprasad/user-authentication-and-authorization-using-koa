const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const cors = require('@koa/cors');
require('dotenv').config();
const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors());

router.get('/', async (ctx) => {
  ctx.body = { message: 'Hello, world!' };
});

app.use(router.routes());
app.use(router.allowedMethods());
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
