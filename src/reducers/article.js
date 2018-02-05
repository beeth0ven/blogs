import {
  ON_FETCH_ARTICLES_CLEAR, ON_FETCH_ARTICLES_ERROR, ON_FETCH_ARTICLES_EXECUTING,
  ON_FETCH_ARTICLES_SUCCESS
} from "../actions/article";
import {newMapFromFalcorObject} from "../libaries/public/map";

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
      const articles = newMapFromFalcorObject(action.data);
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
    default:
      return state;
  }
};

export default articleReducer;

