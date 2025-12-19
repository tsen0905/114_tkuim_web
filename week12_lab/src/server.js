import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from './app.js';

dotenv.config();

async function start() {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
  console.log('MongoDB Memory Server connected');

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

start();
