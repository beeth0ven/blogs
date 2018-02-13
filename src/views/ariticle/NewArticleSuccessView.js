import React, { Component } from "react";
import {Link} from "react-router";
import {RaisedButton} from "material-ui";
import {connect} from "react-redux";
import {onNewArticleClear} from "../../actions/newArticle";

class NewArticleSuccessView extends Component {

  componentWillUnmount() {
    const { onNewArticleClear } = this.props;
    onNewArticleClear()
  }

  render() {
    const { newArticleId } = this.props;

    return (
      <div style={{ width: 300, margin: '0 auto' }}>
        <h3>Save article success with id: {newArticleId || ''}</h3>
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
  state => ({newArticleId: state.newArticle.value}),
  ({ onNewArticleClear })
)(NewArticleSuccessView);

