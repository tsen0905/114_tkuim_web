const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

// 一定要一開始就讀 .env
dotenv.config();

console.log('MONGO_URI =', process.env.MONGO_URI);
console.log('PORT =', process.env.PORT);

const app = express();
app.use(cors());
app.use(express.json());

// 路由
const signupRoute = require('./routes/signup');
app.use('/api/signup', signupRoute);

const PORT = process.env.PORT || 3000;

// 先連線 DB，再啟動 server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });



