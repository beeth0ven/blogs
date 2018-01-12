import {Schema} from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    index: {
      unique: true,
      dropDups: true
    }
  },
  password: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: {
      unique: true,
      dropDups: true
    }
  },
  role: {
    type: String,
    default: 'editor'
  },
  verified: Boolean,
  imageUrl: String
});

export default userSchema;