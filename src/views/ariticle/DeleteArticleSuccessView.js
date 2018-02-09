import React, { Component } from "react";
import {connect} from "react-redux";
import {onDeleteArticleClear} from "../../actions/deleteArticle";
import {Link} from "react-router";
import {RaisedButton} from "material-ui";

class DeleteArticleSuccessView extends Component {

  componentWillUnmount() {
    const {onDeleteArticleClear} = this.props;
    onDeleteArticleClear()
  }

  render() {
    const {deletedArticleId} = this.props;

    return (
      <div style={{width: 300, margin: 'auto'}}>
        <h3>Delete article success with id: {deletedArticleId || ''}</h3>
        <Link to='/dashboard'>
          <RaisedButton style={{width: 300}}
            label='Done'
            secondary
          />
        </Link>
      </div>
    )
  }
}

export default connect(
  state => ({deletedArticleId: state.deleteArticle.value}),
  ({onDeleteArticleClear})
)(DeleteArticleSuccessView);