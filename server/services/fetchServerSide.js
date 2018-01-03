
import {Article} from "./mongooseService";

const articlesById = (articles) => articles
  .reduce((accumulator, article) => new Map([
    ...accumulator,
    [article._id, article.toObject()]
  ]), new Map());

export default () => {
  return Article.find({}, (err, articles) => articles)
    .then((articles) => ({
        articles: articlesById(articles)
      })
    );
}