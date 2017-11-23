import React from 'react';
import { connect } from 'react-redux';
import { addArticles } from '../actions/article';
import falcorModel from '../falcorModel';

class PublishingApp extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.fetch();
  }

  async fetch() {

    const { onGetArticles } = this.props;

    const articlesCount = await falcorModel
      .getValue('articles.length');

    const articles = await falcorModel
      .get([
        'articles',
        {from: 0, to: articlesCount-1},
        ['id', 'articleTitle', 'articleContent']
      ])
      .then((response) => response.json.articles);

    onGetArticles(articles);
  }

  render() {

    const { articles } = this.props;

    const articlesJSX = Object.keys(articles)
      .map((key) => {
        const article = articles[key];
        return (
          <div key={key}>
            <h2>{article.articleTitle}</h2>
            <h3>{article.articleContent}</h3>
          </div>
        )
      });

    return (
      <div>
        <h1>(Frontend) Our publishing app</h1>
        {articlesJSX}
      </div>
    )
  }
}

export default connect(
  (state) => ({articles: state}),
  { onGetArticles: addArticles }
)(PublishingApp)