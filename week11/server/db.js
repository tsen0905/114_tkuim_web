const mongoose = require('mongoose');

async function connectDB() {
  const uri =
    process.env.MONGO_URI ||
    'mongodb://root:rootpassword@localhost:27017/week11db?authSource=admin';

  console.log('=== DEBUG connectDB uri ===');
  console.log(JSON.stringify(uri));   

  try {
    await mongoose.connect(uri);      
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error (FULL):', err);
    throw err;
  }
}

module.exports = connectDB;


