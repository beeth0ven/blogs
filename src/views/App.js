import React, { Component } from 'react';
import {connect} from "react-redux";
import {fetchArticles} from "../actions/article";
import {newArrayFromMap} from "../libaries/public/map";

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
    const { articles } = this.props;

    return (
      <div>
        <h1>Publishing App</h1>
        {newArrayFromMap(articles, this.articleJSX)}
      </div>
    )
  }
}

export default connect(
  (state) => ({...state.article}),
  { fetchArticles }
)(App);