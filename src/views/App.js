import React, { Component } from 'react';
import {connect} from "react-redux";
import {fetchArticles} from "../actions/article";

class App extends Component {

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    this.props.fetchArticles()
  };

  articleJSX = (article) => (
    <div key={article._id}>
      <h2>{article.title}</h2>
      <h4>{article.content}</h4>
    </div>
  );

  render() {
    const { articles } = this.props;

    return (
      <div>
        <h1>Publishing App</h1>
        {articles.map(this.articleJSX)}
      </div>
    )
  }
}

export default connect(
  (state) => ({...state.article}),
  (dispatch) => ({
    fetchArticles: () => dispatch(fetchArticles())
  })
)(App);