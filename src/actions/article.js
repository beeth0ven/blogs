import falcorModel from '../falcorModel';

export const addArticles = (articles) => ({
  type: "ADD_ARTICLES",
  data: articles
});

export const newArticle = (article) => ({
  type: 'NEW_ARTICLE',
  data: article
});

export const editArticle = (article) => ({
  type: 'EDIT_ARTICLE',
  data: article
});

export const deleteArticle = (id) => ({
  type: 'DELETE_ARTICLE',
  data: id
});

export const getArticles = async (dispatch) => {

  const articlesCount = await falcorModel
    .getValue('articles.length');

  const articles = await falcorModel
    .get([
      'articles',
      {from: 0, to: articlesCount-1},
      ['_id', 'articleTitle', 'articleSubTitle', 'articleContent', 'articleContentJSON', 'articlePicUrl']
    ])
    .then((response) => {
      return response.json.articles
    }).catch(error => {
      console.debug(error);
      return 500;
    });

  if (articles === 500) {
    return;
  }

  dispatch(addArticles(articles));
};

