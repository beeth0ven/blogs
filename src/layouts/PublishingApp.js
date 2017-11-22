import React from 'react';
import { connect } from 'react-redux';

class PublishingApp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const { articles, dispatch } = this.props;

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
        <h1>Our publishing app</h1>
        {articlesJSX}
      </div>
    )
  }
}

export default connect(
  (state) => ({articles: state}),
  (dispatch) => ({dispatch: {}})
)(PublishingApp)