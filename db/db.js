const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function connectDB() {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log('Connected to MongoDB');
    return client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

module.exports = { connectDB };
