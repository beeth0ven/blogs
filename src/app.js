import React, { Component } from 'react';
import { render } from 'react-dom';
import falcorModel from './falcorModel';
import Falcor from 'falcor';

class App extends Component {

  constructor() {
    super();

    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {

    const length = await falcorModel.getValue('articles.length');

    const articlesByIndex = await falcorModel.get([
      'articles',
      {from: 0, to: length - 1},
      ['_id', 'articleTitle', 'articleContent']
    ]).then(response => response.json.articles);

    const articles = Falcor.keys(articlesByIndex)
      .map(key => articlesByIndex[key]);

    this.setState({ articles })
  };

  articleJSX = (article) => (
    <div key={article._id}>
      <h3>{article.articleTitle}</h3>
      <h4>{article.articleContent}</h4>
    </div>
  );

  render() {

    return (
      <div>
        <h1>Publishing App</h1>
        {this.state.articles.map(this.articleJSX)}
      </div>
    )
  }
}


render(
  (<App />),
  document.getElementById('root')
);



