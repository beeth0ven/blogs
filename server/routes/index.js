import Article from "../services/mongooseService/Article";
import { ref as $ref } from 'falcor-json-graph';
import session from "./session";

const routes = [
  ...session,
  {
    route: 'articles.length',
    get: async () => {
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
      const indices = pathSet[1];
      const articles = await Article.find({}, '_id');
      return indices.map(index => ({
        path: ['articles', index],
        value: $ref(['articlesById', String(articles[index]['_id'])])
      }));
    }
  },
  {
    route: 'articlesById[{keys}]["_id", "title", "content"]',
    get: async (pathSet) => {
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