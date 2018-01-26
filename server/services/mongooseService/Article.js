import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  title: String,
  content: String
});

const Article = mongoose.model('Article', schema, 'articles');

export default Article;