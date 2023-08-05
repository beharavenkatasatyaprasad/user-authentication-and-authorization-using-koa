const jwt = require('jsonwebtoken');
const User = require('../db/userModel');

const secretKey = process.env.SECRET_KEY;

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

module.exports = { signupUser };
