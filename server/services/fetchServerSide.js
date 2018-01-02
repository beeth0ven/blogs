
import {Article} from "./mongooseService";

const articlesById = (articles) => articles
  .reduce((accumulator, article) => ({
    ...accumulator,
    [article._id]: article.toObject()
  }), {});

export default () => {
  return Article.find({}, (err, articles) => articles)
    .then((articles) => ({
        articles: articlesById(articles)
      })
    );
}