import React, { Component } from 'react';
import {connect} from "react-redux";


class UpdateArticleView extends Component {

  render() {
    console.log('props', this.props);

    return (<h1>Update Article</h1>)
  }
}

export default connect(
  (state, ownProps) => {
    const { _id } = ownProps.params;
    const article = state.article.articles.get(_id);
    return {
      article
    }
  }
)(UpdateArticleView);