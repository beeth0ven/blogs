import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  contentRaw: {
    type: Object
  }
});

const Article = mongoose.model('Article', schema, 'articles');

export default Article;