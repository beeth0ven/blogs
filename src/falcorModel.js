import falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';

const cache = {
  articles: [
    {
      id: '987654',
      articleTitle: 'Lorem ipsum - article one',
      articleContent: 'Here goes the content of the article'
    },
    {
      id: '123456',
      articleTitle: 'Lorem ipsum - article two',
      articleContent: 'Sky is the limit, the content goes here.'
    }
  ]
};

const falcorModel = new falcor.Model({cache});

export default falcorModel;

