// Week11/server/db.js
const mongoose = require('mongoose');

async function connectDB() {
  // 如果 .env 沒讀到，就退回用硬寫的 URI（兩邊都一樣）
  const uri =
    process.env.MONGO_URI ||
    'mongodb://root:rootpassword@localhost:27017/week11db?authSource=admin';

  console.log('=== DEBUG connectDB uri ===');
  console.log(JSON.stringify(uri));   // 這裡會把看不見的字元一起印出來

  try {
    await mongoose.connect(uri);      // 不再傳那些舊版 options
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error (FULL):', err);
    throw err;
  }
}

module.exports = connectDB;


