import React from 'react';
import { connect } from 'react-redux';
import { getArticles } from '../actions/article';
import ArticleCard from "../components/ArticleCard";

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

  articleJSX = (key, article) => (
    <div key={key}>
      <ArticleCard
        title={article.articleTitle}
        content={article.articleContent}
      />
    </div>
  );

  render() {

    const { articles } = this.props;
    const articlesJSX = Object.keys(articles)
      .map((key) => this.articleJSX(key, articles[key]));

    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
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