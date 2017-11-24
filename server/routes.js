import mongoose from 'mongoose';
mongoose.connect('mongodb://luojiedeMac-Mini.local/local');

const articleSchema = {
  articleTitle: String,
  articleContent: String
};

const Article = mongoose.model('Article', articleSchema, 'articles');

const publishingAppRoutes = [
  {
    route: 'articles.length',
    get: () => Article
      .count({}, (error, count) => count)
      .then((count) => ({
        path: ['articles', 'length'],
        value: count
      }))
  },
  {
    route: 'articles[{integers}]["id","articleTitle","articleContent"]',
    get: (pathSet) => {
      const articleIndexes = pathSet[1];
      return Article
        .find({}, (error, articles) => articles)
        .then((articles) => articleIndexes.map((index) => ({
          path: ['articles', index],
          value: articles[index].toObject()
        })))
    }
  }
];

export default publishingAppRoutes;