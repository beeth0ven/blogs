import React, { Component } from 'react';
import {connect} from "react-redux";
import {fetchArticles, onFetchArticlesClear} from "../actions/article";
import {newArrayFromMap} from "../libaries/public/map";
import {Card, CardMedia, CardTitle, Snackbar} from "material-ui";
import {errorMessage} from "../libaries/public/error";
import {AUTO_HIDE_DURATION, DEFAULT_ARTICLE_IMAGE} from "../config";

class App extends Component {

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    this.props.fetchArticles()
  };

  articleJSX = (_id, article) => (
    <Card key={_id} style={{ marginBottom: 20 }}>
      <CardMedia
        overlay={<CardTitle title={article.title} subtitle={article.content}/>}
      >
        <img src={DEFAULT_ARTICLE_IMAGE}/>
      </CardMedia>
    </Card>
  );

  render() {
    const { articles, error, onFetchArticlesClear } = this.props;

    return (
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {newArrayFromMap(articles, this.articleJSX)}
        <Snackbar
          open={error !== null}
          message={errorMessage(error)}
          autoHideDuration={AUTO_HIDE_DURATION}
          onRequestClose={onFetchArticlesClear}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({...state.article}),
  { fetchArticles, onFetchArticlesClear }
)(App);