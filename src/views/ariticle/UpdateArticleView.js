import React, { Component } from 'react';
import {connect} from "react-redux";
import {RaisedButton, Snackbar} from "material-ui";
import {DEFAULT_AUTO_HIDE_DURATION} from "../../config";
import {pushDashboard} from "../../actions/router";
import {EditorState} from "draft-js";
import Formsy from 'formsy-react';
import DefaultInput from "../../components/DefaultInput";
import ContentEditor from "../../components/article/ContentEditor";
import {contentRawFromEditorState, editorStateFromContentRaw} from "../../libaries/public/draft";
import {updateArticleIfNeeded} from "../../actions/updateArticle";

class UpdateArticleView extends Component {

  constructor(props) {
    super(props);

    const { article } = props;
    const hasContent = (article && article.contentRaw);

    const editorState = hasContent
      ? editorStateFromContentRaw(article.contentRaw)
      : EditorState.createEmpty();

    this.state = {
      editorState
    };
  }

  onSubmit = (formInfo) => {
    console.info('formInfo', formInfo);

    const { updateArticleIfNeeded, article } = this.props;
    const { editorState } = this.state;

    const _id = article._id;
    const contentRaw = contentRawFromEditorState(editorState);

    const articleInfo = {
      _id,
      ...formInfo,
      contentRaw
    };

    console.info('articleInfo', articleInfo);

    updateArticleIfNeeded(articleInfo);

  };

  onEditorStateChange = (editorState) => {
    this.setState({editorState});
  };

  notFoundJSX = () => {
    const { pushDashboard } = this.props;
    return (
      <Snackbar
        open={true}
        message={'Article not found!'}
        autoHideDuration={DEFAULT_AUTO_HIDE_DURATION}
        onRequestClose={pushDashboard}
      />
    )
  };

  contentJSX = () => {
    const { article } = this.props;
    return (
      <div style={{maxWidth: 600, margin: 'auto'}}>
        <h1>Update Article</h1>
        <Formsy onSubmit={this.onSubmit}>

          <DefaultInput
            title='Title'
            name='title'
            type='text'
            initialValue={article.title}
            required
          />

          <DefaultInput
            title='Content'
            name='content'
            type='text'
            initialValue={article.content}
            required
          />

          <ContentEditor
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
          />

          <div style={{marginTop: 24}}>
            <RaisedButton
              label='Update article'
              type='submit'
              style={{ width: 200, display: 'block', margin: 'auto' }}
              secondary
            />
          </div>

        </Formsy>
      </div>
    )
  };

  render() {
    const { article } = this.props;
    return !article
      ? this.notFoundJSX()
      : this.contentJSX();
  }
}

export default connect(
  (state, ownProps) => {
    const { _id } = ownProps.params;
    const article = state.article.articles.get(_id);
    return {
      article
    }
  },
  ({updateArticleIfNeeded, pushDashboard})
)(UpdateArticleView);