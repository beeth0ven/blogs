import sessionRoutes from './sessionRoutes';
import { Article } from '../services/mongooseService';

const publishingAppRoutes = [
  ...sessionRoutes,
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