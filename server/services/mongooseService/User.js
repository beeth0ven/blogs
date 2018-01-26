import mongoose, { Schema } from 'mongoose';

const requiredString = {
  type: String,
  required: true
};

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: requiredString,
  email: requiredString,
  role: requiredString
});

const User = mongoose.model('User', schema, 'users');

export default User;