import falcorModel from '../falcorModel';

export const addArticles = (articles) => ({
  type: "ADD_ARTICLES",
  data: articles
});

export const getArticles = async (dispatch) => {

  const articlesCount = await falcorModel
    .getValue('articles.length');

  const articles = await falcorModel
    .get([
      'articles',
      {from: 0, to: articlesCount-1},
      ['_id', 'articleTitle', 'articleContent']
    ])
    .then((response) => {
      console.log('getArticles response', response);
      return response.json.articles
    });

  console.log('getArticles articles', articles);

  dispatch(addArticles(articles));
};