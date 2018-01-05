import sessionRoutes from './sessionRoutes';
import { Article } from '../services/mongooseService';
import jsonGraph from 'falcor-json-graph';
import {createToken} from "../internal/jwt/index";

let $atom = jsonGraph.atom;
let $ref = jsonGraph.ref;

const atomArticleContentJSON = (articleObject) => {
  if (typeof articleObject.articleContentJSON !== 'undefined') {
    articleObject.articleContentJSON = $atom(articleObject.articleContentJSON);
  }
};

export default (req, res) => {
  const { token, role, username } = req.headers;
  const authSignToken = createToken(username, role);
  const isAuthorized = authSignToken === token;
  const sessionObject = {isAuthorized, role, username};

  console.info(`The ${username} is authorized === `, isAuthorized);

  return [
    ...sessionRoutes,
    {
      route: 'articles.length',
      get: () =>
        Article
          .count({}, (error, count) => count)
          .then((count) => ({
            path: ['articles', 'length'],
            value: count
          }))
    },
    {
      route: 'articles[{integers}]',
      get: (pathSet) => {
        const indices = pathSet[1];
        return Article.find({}, '_id', (error, articles) => articles)
          .then((articles) => indices.map((index) => {
            const articleID = articles[index]['_id'];
            return {
              path: ['articles', index],
              value: $ref(['articlesByID', String(articleID)])
            }
        }))
      }
    },
    {
      route: 'articlesByID[{keys}]["_id","articleTitle","articleContent", "articleContentJSON"]',
      get: (pathSet) => {
        const articleIDs = pathSet[1];
        return Article.find(
          { '_id': { $in: articleIDs } },
          (error, articles) => articles
        )
          .then((articles) => articles.map((article) => {
            let articleObject = article.toObject();
            atomArticleContentJSON(articleObject);
            const articleID = articleObject['_id'];
            return {
              path: ['articlesByID', String(articleID)],
              value: articleObject
            }
          }));
      }
    },
    {
      route: 'articles.add',
      call: (callPath, args) => {
        const articleObject = args[0];
        let article = new Article(articleObject);

        return article.save((error, data) => {
          if (error) {
            console.info('ERROR', error);
            return error;
          } else {
            return data;
          }
        }).then((data) =>
          Article.count({}, (error, count) => {})
            .then((count) => ({ count, data }))
        ).then((res) => {
          const articleObject = res.data.toObject();
          const articleID = articleObject['_id'];
          const articleRef = $ref(['articlesByID', articleID]);
          return [
            {
              path: ['articles', res.count-1],
              value: articleRef
            },
            {
              path: ['articles', 'articleID'],
              value: String(articleID)
            },
            {
              path: ['articles', 'length'],
              value: res.count
            }
          ];
        })
      }
    }
  ];
}