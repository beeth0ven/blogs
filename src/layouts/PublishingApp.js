import React from 'react';
import { connect } from 'react-redux';
import { getArticles } from '../actions/article';

class PublishingApp extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.fetch();
    }
  }

  async fetch() {
    const { fetchArticles } = this.props;
    fetchArticles()
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
  (state) => ({articles: state.articles}),
  (dispatch) => ({
    fetchArticles: () => getArticles(dispatch)
  })
)(PublishingApp)