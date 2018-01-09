import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const conf = {
  hostname: process.env.MONGO_HOSTNAME || 'luojiedeMac-Mini.local',
  port: process.env.MONGO_PORT || 27017,
  env: process.env.MONGO_ENV || 'local'
};

mongoose.connect(`mongodb://${conf.hostname}/${conf.env}`);

const articleSchema = new Schema(
  {
    articleTitle: String,
    articleContent: String,
    articleContentJSON: Object,
    articlePicUrl: {
      type: String,
      default: '/static/placeholder.png'
    }
  },
  {
    minimize: false
  }
);

const userSchema = {
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
};

const Article = mongoose.model('Article', articleSchema, 'articles');
const User = mongoose.model('User', userSchema, 'pubUsers');

export { Article, User };