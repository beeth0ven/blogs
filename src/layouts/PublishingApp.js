import React from 'react';
import { connect } from 'react-redux';
import { getArticles } from '../actions/article';
import ArticleCard from "../components/ArticleCard";
import {mapMap} from "../internal/MapExtension";

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
    const articlesJSX = mapMap(
      articles,
      (key, article) => this.articleJSX(key, article)
    );

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