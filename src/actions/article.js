import falcorModel from '../services/falcorModel';

const ON_FETCH_ARTICLES_EXECUTING = 'ON_FETCH_ARTICLES_EXECUTING';
const ON_FETCH_ARTICLES_SUCCESS = 'ON_FETCH_ARTICLES_SUCCESS';
const ON_FETCH_ARTICLES_ERROR = 'ON_FETCH_ARTICLES_ERROR';
const ON_FETCH_ARTICLES_CLEAR = 'ON_FETCH_ARTICLES_CLEAR';

const onFetchArticlesExecuting = () => ({
  type: ON_FETCH_ARTICLES_EXECUTING,
});

const onFetchArticlesSuccess = (articles) => ({
  type: ON_FETCH_ARTICLES_SUCCESS,
  data: articles
});

const onFetchArticlesError = (error) => ({
  type: ON_FETCH_ARTICLES_ERROR,
  error
});

const onFetchArticlesClear = () => ({
  type: ON_FETCH_ARTICLES_CLEAR,
});

const fetchArticles = () => async (dispatch) => {

  try {

    const length = await falcorModel.getValue('articles.length');

    const articlesByIndex = await falcorModel.get([
      'articles',
      {from: 0, to: length - 1},
      ['_id', 'title', 'content']
    ]).then(response => response.json.articles);


    dispatch(onFetchArticlesSuccess(articlesByIndex))

  } catch (error) {

    dispatch(onFetchArticlesError(error));
  }
};

export {
  ON_FETCH_ARTICLES_EXECUTING,
  ON_FETCH_ARTICLES_SUCCESS,
  ON_FETCH_ARTICLES_ERROR,
  ON_FETCH_ARTICLES_CLEAR,
  onFetchArticlesExecuting,
  onFetchArticlesSuccess,
  onFetchArticlesError,
  onFetchArticlesClear,
  fetchArticles,
}