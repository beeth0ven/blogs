
const articlesById = (responseArticles) => Object.keys(responseArticles)
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
      const articlesMap = articlesById(action.data);
      return new Map([
        ...state,
        ...articlesMap
      ]);
    case 'NEW_ARTICLE':
      const article = action.data;
      return new Map([
        ...state,
        [article._id, article]
      ]);
    default:
      return state;
  }
};

export default articles;