import React, { Component } from 'react';
import {connect} from "react-redux";
import {fetchArticles, onFetchArticlesClear} from "../actions/article";
import {newArrayFromMap} from "../libaries/public/map";
import {Snackbar} from "material-ui";
import {errorMessage} from "../libaries/public/error";
import {AUTO_HIDE_DURATION} from "../config";

class App extends Component {

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    this.props.fetchArticles()
  };

  articleJSX = (_id, article) => (
    <div key={_id}>
      <h2>{article.title}</h2>
      <h4>{article.content}</h4>
    </div>
  );

  render() {
    const { articles, error, onFetchArticlesClear } = this.props;

    return (
      <div>
        <h1>Publishing App</h1>
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