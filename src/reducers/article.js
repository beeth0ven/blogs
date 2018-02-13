import {
  ON_ADDED_ARTICLE, ON_DELETED_ARTICLE,
  ON_FETCH_ARTICLES_CLEAR, ON_FETCH_ARTICLES_ERROR, ON_FETCH_ARTICLES_EXECUTING,
  ON_FETCH_ARTICLES_SUCCESS, ON_UPDATED_ARTICLE
} from "../actions/article";
import {} from "../libaries/public/map";
import Falcor from 'falcor';

const newArticlesMap = (data) => Falcor.keys(data)
  .reduce((articlesMap, key) => {
    const article = data[key];
    return new Map([
      ...articlesMap,
      [article._id, article]
    ])
  } , new Map());

const empty = {
  articles: new Map(),
  isExecuting: false,
  error: null
};

const articleReducer = (state = empty, action) => {
  switch (action.type) {
    case ON_FETCH_ARTICLES_EXECUTING:
      return {
        articles: new Map(),
        isExecuting: true,
        error: null
      };
    case ON_FETCH_ARTICLES_SUCCESS:
      const articles = newArticlesMap(action.data);
      return {
        articles,
        isExecuting: false,
        error: null
      };
    case ON_FETCH_ARTICLES_ERROR:
      return {
        articles: new Map(),
        isExecuting: false,
        error: action.error
      };
    case ON_FETCH_ARTICLES_CLEAR:
      return empty;
    case ON_ADDED_ARTICLE:
      const newArticle = action.data;
      return {
        ...state,
        articles: new Map([
          ...state.articles,
          [newArticle._id, newArticle]
        ])
      };
    case ON_UPDATED_ARTICLE:
      const updatedArticle = action.data;
      return {
        ...state,
        articles: new Map([
          ...state.articles,
          [updatedArticle._id, updatedArticle]
        ])
      };
    case ON_DELETED_ARTICLE:
      let articlesMap = new Map([...state.articles]);
      const deletedArticleId = action.data;
      articlesMap.delete(deletedArticleId);
      return {
        ...state,
        articles: articlesMap
      };
    default:
      return state;
  }
};

export default articleReducer;

