
import {deletedMap} from "../internal/MapExtension";

const articlesByID = (responseArticles) => Object.keys(responseArticles)
  .reduce((accumulator, key) => {
    const article = responseArticles[key];
    return new Map([
      ...accumulator,
      [article._id, article]
    ])}, new Map());

const articles = (state = new Map(), action) => {
  console.log('articles.action', action);
  switch (action.type) {
    case 'ADD_ARTICLES':
      const articlesMap = articlesByID(action.data);
      return new Map([
        ...state,
        ...articlesMap
      ]);
    case 'NEW_ARTICLE':
      const newArticle = action.data;
      return new Map([
        ...state,
        [newArticle._id, newArticle]
      ]);
    case 'EDIT_ARTICLE':
      const editedArticle = action.data;
      return new Map([
        ...state,
        [editedArticle._id, editedArticle]
      ]);
    case 'DELETE_ARTICLE':
      const deletedArticleID = action.data;
      return deletedMap(state, deletedArticleID);
    default:
      return state;
  }
};

export default articles;