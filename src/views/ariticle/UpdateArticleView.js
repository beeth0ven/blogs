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
import {onUpdateArticleClear, updateArticleIfNeeded} from "../../actions/updateArticle";
import {errorMessage} from "../../libaries/public/error";
import {deleteArticleIfNeeded, onDeleteArticleClear} from "../../actions/deleteArticle";
import DashView from "../DashView";
import ConfirmButton from "../../components/ConfirmButton";

class UpdateArticleView extends Component {

  constructor(props) {
    super(props);

    const { article } = props;
    const hasContent = (article && article.contentRaw);

    const editorState = hasContent
      ? editorStateFromContentRaw(article.contentRaw)
      : EditorState.createEmpty();

    this.state = { editorState };
  }

  componentWillUnmount() {
    const { onUpdateArticleClear, onDeleteArticleClear } = this.props;
    onUpdateArticleClear();
    onDeleteArticleClear();
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

  onConfirmDelete = () => {
    console.info('onConfirmDelete');

    const { deleteArticleIfNeeded, article } = this.props;
    deleteArticleIfNeeded(article._id);
  };

  updatedJSX = () => (
    <DashView
      message={'Update article success!'}
      onDoneClick={this.props.pushDashboard}
    />
  );

  deletedJSX = () => (
    <DashView
      message={'Delete article success!'}
      onDoneClick={this.props.pushDashboard}
    />
  );

  notFoundJSX = () => (
    <DashView
      message={'Article not found!'}
      onDoneClick={this.props.pushDashboard}
    />
  );

  contentJSX = () => {
    const { article, updateArticle, onUpdateArticleClear, deleteArticle, onDeleteArticleClear } = this.props;
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

          <Snackbar
            open={updateArticle.error !== null}
            message={errorMessage(updateArticle.error)}
            autoHideDuration={DEFAULT_AUTO_HIDE_DURATION}
            onRequestClose={onUpdateArticleClear}
          />

        </Formsy>

        <hr/>
        <h1>Delete this article</h1>

        <ConfirmButton
          label='Delete'
          confirmLabel='Confirm delete this article.'
          onConfirm={this.onConfirmDelete}
        />

        <Snackbar
          open={deleteArticle.error !== null}
          message={errorMessage(deleteArticle.error)}
          autoHideDuration={DEFAULT_AUTO_HIDE_DURATION}
          onRequestClose={onDeleteArticleClear}
        />

      </div>
    )
  };

  render() {
    const { article, deleteArticle, updateArticle } = this.props;
    if (updateArticle.value) { return this.updatedJSX() }
    if (deleteArticle.value) { return this.deletedJSX() }
    return !article ? this.notFoundJSX() : this.contentJSX();
  }
}

export default connect(
  (state, ownProps) => {
    const { _id } = ownProps.params;
    const article = state.article.articles.get(_id);
    return {
      article,
      updateArticle: state.updateArticle,
      deleteArticle: state.deleteArticle,
    }
  },
  ({
    updateArticleIfNeeded,
    pushDashboard,
    onUpdateArticleClear,
    deleteArticleIfNeeded,
    onDeleteArticleClear
  })
)(UpdateArticleView);