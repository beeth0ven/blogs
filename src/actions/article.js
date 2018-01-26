import falcorModel from '../falcorModel';
import {newMapFromObject} from "../libaries/public/map";

const ON_FETCH_ARTICLES_SUCCESS = 'ON_FETCH_ARTICLES_SUCCESS';
const ON_FETCH_ARTICLES_ERROR = 'ON_FETCH_ARTICLES_ERROR';

const onFetchArticlesSuccess = (articles) => ({
  type: ON_FETCH_ARTICLES_SUCCESS,
  data: articles
});

const onFetchArticlesError = (error) => ({
  type: ON_FETCH_ARTICLES_ERROR,
  error
});

const fetchArticles = () => async (dispatch) => {

  try {

    const length = await falcorModel.getValue('articles.length');

    const articlesByIndex = await falcorModel.get([
      'articles',
      {from: 0, to: length - 1},
      ['_id', 'title', 'content']
    ]).then(response => response.json.articles);

    const articlesMap = newMapFromObject(articlesByIndex);

    dispatch(onFetchArticlesSuccess(articlesMap))

  } catch (error) {
    dispatch(onFetchArticlesError(error))
  }
};

export {
  ON_FETCH_ARTICLES_SUCCESS,
  ON_FETCH_ARTICLES_ERROR,
  onFetchArticlesSuccess,
  onFetchArticlesError,
  fetchArticles
}