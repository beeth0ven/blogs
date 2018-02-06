
import Article from "../services/mongooseService/Article";
import { ref as $ref, error as $error, atom as $atom } from 'falcor-json-graph';
import {verifyToken} from "../libaries/internal/jsonWebToken/index";

const withAuthorization = async ({ path, bearerToken, asyncTry, catchError }) => {
  try {
    const { username, role } = verifyToken(bearerToken);
    return await asyncTry({ username, role })
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        return {
          path: path,
          value: $error('token expired, please log in again.')
        };
      case 'JsonWebTokenError':
        return {
          path: path,
          value: $error('token is invalid, please log in.')
        };
      default:
        const errorMessage = catchError(error);
        return {
          path: path,
          value: $error(errorMessage)
        };
    }
  }
};

const article = (request, response) => {

  const bearerToken = request.headers.authorization;

  return  [
    {
      route: 'articles.length',
      get: async () => await withAuthorization({
          path: ['articles', 'length'],
          bearerToken,
          asyncTry: async ({ username, role }) => {
            const count = await Article.count();
            return {
              path: ['articles', 'length'],
              value: count
            };
          },
          catchError: error => "can't get article's length, please try again."
        })
    },
    {
      route: 'articles[{integers}]',
      get: async (pathSet) => await withAuthorization({
          path: ['articles'],
          bearerToken,
          asyncTry: async ({ username, role }) => {
            const indices = pathSet[1];
            const articles = await Article.find({}, '_id');
            return indices.map(index => ({
              path: ['articles', index],
              value: $ref(['articlesById', articles[index]._id.toString()])
            }))
          },
          catchError: error => "can't get articles, please try again."
        })
    },
    {
      route: 'articlesById[{keys}]["_id", "title", "content"]',
      get: async (pathSet) => await withAuthorization({
          path: ['articlesById'],
          bearerToken,
          asyncTry: async ({ username, role }) => {
            const _ids = pathSet[1];
            const articles = await Article.find({ _id: { $in: _ids } });
            return articles.map(article => ({
              path: ['articlesById', article._id.toString()],
              value: article.toObject()
            }))
          },
          catchError: error => "can't get articles, please try again."
        })
    },
    {
      route: 'article.new',
      call:  async (callPath, params) => await withAuthorization({
        path: ['article', 'new'],
        bearerToken,
        asyncTry: async ({ username, role }) => {
          const [articleObject] = params;
          const article = new Article(articleObject);
          const savedArticle = await article.save();
          const count = await Article.count();
          return [
            {
              path: ['article', 'new', '_id'],
              value: savedArticle._id.toString()
            },
            {
              path: ['article', 'length'],
              value: count
            }
          ]
        },
        catchError: error => "can't create new article."
      })
    },
    {
      route: 'article.update',
      call: async (callPath, params) => await withAuthorization({
        path: ['article', 'update'],
        bearerToken,
        asyncTry: async ({ username, role }) => {
          const [articleObject] = params;
          const article = new Article(articleObject);
          await article.save();
          return {
            path: ['articlesById', articleObject._id],
            invalidated: true
          }

        },
        catchError: error => "can't update article."
      })
    }
  ]
};

export default article;