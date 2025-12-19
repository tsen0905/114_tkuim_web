import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  }
});

export default mongoose.model('User', userSchema);
