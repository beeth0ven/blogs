import falcorModel from '../falcorModel';
import Falcor from 'falcor';

const ON_FETCH_ARTICLES_SUCCESS = 'ON_FETCHED_ARTICLES';
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

    const articles = Falcor.keys(articlesByIndex)
      .map(key => articlesByIndex[key]);

    dispatch(onFetchArticlesSuccess(articles))

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