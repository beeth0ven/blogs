import {ON_FETCH_ARTICLES_ERROR, ON_FETCH_ARTICLES_SUCCESS} from "../actions/article";

const empty = {
  articles: new Map(),
  error: null
};

const articleReducer = (state = empty, action) => {
  switch (action.type) {
    case ON_FETCH_ARTICLES_SUCCESS:
      return {
        articles: action.data,
        error: null
      };
    case ON_FETCH_ARTICLES_ERROR:
      return {
        articles: state.articles,
        error: action.error
      };
    default:
      return state;
  }
};

export default articleReducer;