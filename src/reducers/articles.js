
const articleById = (article) => ({ [article._id]: article });

const articlesById = (responseArticles) => Object.keys(responseArticles)
  .reduce((accumulator, key) => {
    const articleObject = articleById(responseArticles[key]);
    return { ...accumulator, ...articleObject };
  }, {});

const deleteArticle = (articles, id) => {
  let newArticles = Object.assign(articles);
  delete newArticles[id];
  return newArticles;
};

const articles = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ARTICLES':
      const articleObjects = articlesById(action.data);
      return { ...state, ...articleObjects };
    case 'NEW_ARTICLE':
      const articleObject = articleById(action.data);
      return { ...state, ...articleObject };
    default:
      return state;
  }
};

export default articles;