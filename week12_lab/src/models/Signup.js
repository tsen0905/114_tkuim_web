import mongoose from 'mongoose';

const signupSchema = new mongoose.Schema({
  name: String,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Signup', signupSchema);
