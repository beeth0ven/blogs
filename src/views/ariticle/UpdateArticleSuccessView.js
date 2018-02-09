import React, { Component } from "react";
import {connect} from "react-redux";
import {onUpdateArticleClear} from "../../actions/updateArticle";
import {Link} from "react-router";
import {RaisedButton} from "material-ui";

class UpdateArticleSuccessView extends Component {

  componentWillUnmount() {
    const { onUpdateArticleClear } = this.props;
    onUpdateArticleClear()
  }

  render() {
    const { updatedArticleId } = this.props;

    return (
      <div style={{ width: 300, margin: '0 auto' }}>
        <h3>Update article success with id: {updatedArticleId || ''}</h3>
        <Link to='/dashboard'>
          <RaisedButton
            style={{width: 300}}
            secondary
            label='Done'
          />
        </Link>
      </div>
    );
  }
}

export default connect(
  state => ({updatedArticleId: state.updateArticle.value}),
  ({ onUpdateArticleClear })
)(UpdateArticleSuccessView);