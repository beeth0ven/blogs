import Falcor from 'falcor';
import FalcorExpress from 'falcor-express';

const cache = {
  articles: [
    {
      "_id" : "5a4460a0219ea200a78830f1",
      "articleId" : "987654",
      "articleTitle" : "Lorem ipsum - article one",
      "articleContent" : "Here goes the content of the article"
    },
    {
      "_id" : "5a4460b5219ea200a78830f7",
      "articleId" : "123456",
      "articleTitle" : "Lorem ipsum - article two",
      "articleContent" : "Sky is the limit, the content goes here."
    }
  ]
};

const model = new Falcor.Model({cache});
const dataSourceRoute = FalcorExpress.dataSourceRoute((request, response) => model.asDataSource());

export { dataSourceRoute };
