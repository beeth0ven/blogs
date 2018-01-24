import Article from "../mongooseService/Article";
import { ref } from 'falcor-json-graph';

const routes = [
  {
    route: 'articles.length',
    get: async () => {
      console.log('articles.length');
      const count = await Article.count();
      return {
        path: ['articles', 'length'],
        value: count
      };
    }
  },
  {
    route: 'articles[{integers}]',
    get: async (pathSet) => {
      console.log('articles');
      const indices = pathSet[1];
      const articles = await Article.find({}, '_id');
      return indices.map(index => ({
        path: ['articles', index],
        value: ref(['articlesById', String(articles[index]['_id'])])
      }));
    }
  },
  {
    route: 'articlesById[{keys}]["_id", "title", "content"]',
    get: async (pathSet) => {
      console.log('articlesById');
      const _ids = pathSet[1];
      const articles = await Article.find({ _id: { $in: _ids } });
      return articles.map(article => ({
        path: ['articlesById', String(article._id)],
        value: article.toObject()
      }));
    }
  }
];

export default routes;