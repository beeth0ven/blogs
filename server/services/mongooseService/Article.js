import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  title: String,
  content: String
});

const Article = mongoose.model('Article', schema, 'articles');

// Article
//   .find({}, ['_id'])
//   .then(value => console.log(value));

export default Article;