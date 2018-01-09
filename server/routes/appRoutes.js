import sessionRoutes from './sessionRoutes';
import { Article } from '../services/mongooseService';
import jsonGraph from 'falcor-json-graph';
import {validToken} from "../internal/jwt/index";

let $atom = jsonGraph.atom;
let $ref = jsonGraph.ref;
let $error = jsonGraph.error;

const atomArticleContentJSON = (articleObject) => {
  if (typeof articleObject.articleContentJSON !== 'undefined') {
    articleObject.articleContentJSON = $atom(articleObject.articleContentJSON);
  }
};

const validSession = (sessionObject, path) => {
  if (sessionObject.isAuthorized === false) {
    return {
      path,
      value: $error('auth error')
    }
  } else if (sessionObject.role !== 'editor' && sessionObject.role !== 'admin') {
    return {
      path,
      value: $error('you must be an editor in order to perform this action')
    }
  }
};

export default (req, res) => {
  const { token, role, username } = req.headers;
  const isAuthorized = validToken(token, role, username);
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
        const sessionError = validSession(sessionObject, ['articles']);
        if (sessionError) { return sessionError }

        const articleObject = args[0];
        let article = new Article(articleObject);

        return article.save((error, article) => {
          if (error) {
            console.info('ERROR', error);
            return error;
          } else {
            return article;
          }
        }).then((article) =>
          Article.count({}, (error, count) => {})
            .then((count) => ({ count, article }))
        ).then((res) => {
          const articleObject = res.article.toObject();
          const articleID = articleObject['_id'];
          const articleRef = $ref(['articlesByID', articleID]);
          return [
            {
              path: ['articles', res.count-1],
              value: articleRef
            },
            {
              path: ['articles', 'newArticleID'],
              value: String(articleID)
            },
            {
              path: ['articles', 'length'],
              value: res.count
            }
          ];
        })
      }
    },
    {
      route: 'articles.update',
      call: async (callPath, args) => {
        const sessionError = validSession(sessionObject, ['articles']);
        if (sessionError) { return sessionError }

        const articleObject = args[0];
        const articleID = articleObject['_id'];
        let article = new Article(articleObject);
        article.isNew = false;

        return article.save((error, article) => {
          if (error) {
            console.info('ERROR', error);
            return error;
          }
        }).then((error, article) => {
          return [
            {
              path: ['articlesByID', articleID],
              value: articleObject
            },
            {
              path: ['articlesByID', articleID],
              invalidate: true
            }
          ]
        })
      }
    },
    {
      route: 'articles.delete',
      call: (callPath, args) => {
        const sessionError = validSession(sessionObject, ['articles']);
        if (sessionError) { return sessionError }

        const articleID = args[0];
        return Article.find({ '_id': articleID })
          .remove((error) => {
            if (error) {
              console.info('ERROR', error);
              return error;
            }
          }).then((res) => ({
              path: ['articlesByID', articleID],
              invalidate: true
          }))
      }
    }
  ];
}