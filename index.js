const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { connectDB } = require('./db/db');
require('dotenv').config();
const app = new Koa();
const router = new Router();

// Middleware
app.use(bodyParser());
app.use(cors());

(async () => {
  // Connect to MongoDB and start the server
  await connectDB();

  // index route
  router.get('/', async (ctx) => {
    ctx.body = { message: 'Hello, world!' };
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
  const port = 8000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})();
