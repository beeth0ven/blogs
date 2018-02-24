import React, { Component } from 'react';
import {connect} from "react-redux";
import {pushArticleNotFound} from "../../actions/router";
import {EditorState} from "draft-js/lib/Draft";
import {contentRawFromEditorState, editorStateFromContentRaw} from "../../libaries/public/draft";
import {onUpdateArticleClear, updateArticleIfNeeded} from "../../actions/updateArticle";
import {deleteArticleIfNeeded, onDeleteArticleClear} from "../../actions/deleteArticle";
import UpdateArticleForm from "../../components/article/UpdateArticleForm";
import DeleteArticleForm from "../../components/article/DeleteArticleForm";
import Snackbar from "material-ui/Snackbar";
import {errorMessage} from "../../libaries/public/error";
import {DEFAULT_AUTO_HIDE_DURATION} from "../../config";

class UpdateArticleView extends Component {

  constructor(props) {
    super(props);

    const editorState = this.initialEditorState();
    this.state = { editorState };
  }

  initialEditorState = () => {
    console.info('UpdateArticleView initialEditorState');
    const { article } = this.props;
    const hasContent = (article && article.contentRaw);

    return hasContent
      ? editorStateFromContentRaw(article.contentRaw)
      : EditorState.createEmpty();
  };

  componentWillReceiveProps(nextProps) {
    console.info('UpdateArticleView componentWillReceiveProps');
    const { article, pushArticleNotFound, params } = nextProps;
    const notFound = !article;
    if (notFound) pushArticleNotFound(params._id);
  }

  onSubmit = (formInfo) => {

    const { updateArticleIfNeeded } = this.props;
    const remainArticleInfo = this.remainArticleInfo();

    const articleInfo = {
      ...formInfo,
      ...remainArticleInfo
    };

    console.info('articleInfo', articleInfo);
    updateArticleIfNeeded(articleInfo);
  };

  remainArticleInfo = () => {
    const { article } = this.props;
    const { editorState } = this.state;
    const _id = article._id;
    const contentRaw = contentRawFromEditorState(editorState);
    return {_id, contentRaw}
  };

  onEditorStateChange = (editorState) => {
    this.setState({editorState});
  };

  onConfirmDelete = () => {
    console.info('onConfirmDelete');
    const { deleteArticleIfNeeded, article } = this.props;
    deleteArticleIfNeeded(article._id);
  };

  render() {
    const { article, updateArticle, onUpdateArticleClear, deleteArticle, onDeleteArticleClear } = this.props;
    const { editorState } = this.state;
    if (!article) return <h3>Loading</h3>;
    return (
      <div style={{maxWidth: 600, margin: 'auto'}}>
        <h1>Update Article</h1>
        <UpdateArticleForm
          article={article}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          onSubmit={this.onSubmit}
        />

        <hr/>

        <h1>Delete this article</h1>
        <DeleteArticleForm
          onConfirmDelete={this.onConfirmDelete}
        />

        <Snackbar
          open={updateArticle.error !== null}
          message={errorMessage(updateArticle.error)}
          autoHideDuration={DEFAULT_AUTO_HIDE_DURATION}
          onRequestClose={onUpdateArticleClear}
        />

        <Snackbar
          open={deleteArticle.error !== null}
          message={errorMessage(deleteArticle.error)}
          autoHideDuration={DEFAULT_AUTO_HIDE_DURATION}
          onRequestClose={onDeleteArticleClear}
        />

      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    article: state.article.articles.get(ownProps.params._id),
    updateArticle: state.updateArticle,
    deleteArticle: state.deleteArticle,
  }),
  ({
    updateArticleIfNeeded,
    onUpdateArticleClear,
    deleteArticleIfNeeded,
    onDeleteArticleClear,
    pushArticleNotFound,
  })
)(UpdateArticleView);