import CommonReducerBuilder from "../libaries/public/CommonReducerBuilder";

const deleteArticleReducerBuilder = new CommonReducerBuilder({
  path: 'deleteArticle',
  defaultValue: null
});

export default deleteArticleReducerBuilder;