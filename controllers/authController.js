const jwt = require('jsonwebtoken');
const User = require('../db/userModel');
const bcrypt = require('bcryptjs');

const secretKey = process.env.SECRET_KEY;

async function loginUser(ctx) {
  const { username, password } = ctx.request.body;

  try {
    // Find the user in the database based on the username
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      ctx.status = 401;
      ctx.body = { error: 'Invalid credentials' };
      return;
    }

    // Generate a JWT token and send it in the response
    const token = jwt.sign({ _id: user._id, username: user.username }, secretKey, {
      expiresIn: '1h',
    });
    ctx.body = { token };
  } catch (error) {
    console.error('Error during login', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
}

async function signupUser(ctx) {
  const { username, password } = ctx.request.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      ctx.status = 409;
      ctx.body = { error: 'Username already exists' };
      return;
    }

    // Create a new user record in the database
    const newUser = new User({ username, password });
    await newUser.save();

    // Generate a JWT token and send it in the response
    const token = jwt.sign({ _id: newUser._id, username: newUser.username }, secretKey, {
      expiresIn: '1h',
    });
    ctx.body = { token };
  } catch (error) {
    console.error('Error during signup', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
}

// Verify JWT token and extract user information
async function verifyToken(ctx, next) {
  const token = ctx.header.authorization?.replace('Bearer ', '');
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized - Missing token' };
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    ctx.state.user = decoded; // Save the decoded user information to the context state
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: 'Unauthorized - Invalid token' };
  }
}

module.exports = { loginUser, signupUser, verifyToken };
