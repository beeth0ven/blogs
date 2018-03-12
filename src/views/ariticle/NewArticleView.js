import React, { Component } from 'react';
import {connect} from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import Formsy from 'formsy-react';
import DefaultInput from "../../components/DefaultInput";
import ContentEditor from "../../components/article/ContentEditor";
import {contentRawFromEditorState} from "../../libaries/public/draft";
import {onNewArticleClear, saveNewArticleIfNeeded} from "../../actions/newArticle";
import {errorMessage} from "../../libaries/public/error";
import {pushDashboard} from "../../actions/router";
import {EditorState} from "draft-js/lib/Draft";
import {DEFAULT_AUTO_HIDE_DURATION} from "../../config";
import ReactS3Uploader from 'react-s3-uploader';


class NewArticleView extends Component {

  constructor() {
    super();

    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({editorState});
  };

  onSubmit = async (formInfo) => {
    console.log('onSubmit', formInfo);

    const contentRaw = contentRawFromEditorState(this.state.editorState);

    const articleInfo = {
      ...formInfo,
      contentRaw
    };

    console.log('contentRaw', contentRaw);
    console.log('articleInfo', articleInfo);

    this.props.saveNewArticleIfNeeded(articleInfo);

  };

  pushDashboard = () => {
    const { onNewArticleClear, pushDashboard } = this.props;
    onNewArticleClear();
    pushDashboard();
  };

  render() {
    const { error, onNewArticleClear } = this.props;

    return (
      <div style={{maxWidth: 600, margin: 'auto'}}>
        <h2>New Article</h2>
        <Formsy onSubmit={this.onSubmit}>

          <DefaultInput
            title='Title'
            name='title'
            type='text'
            required
          />

          <DefaultInput
            title='Content'
            name='content'
            type='text'
            required
          />

          <ContentEditor
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
          />

          <ReactS3Uploader
            server='https://localhost:3000'
            signingUrl='/s3/sign'
            accept='image/*'
            onProgress={(progressInPercent, uploadStatusText) => {
              console.log('onProgress');
              console.log('progressInPercent', progressInPercent);
              console.log('uploadStatusText', uploadStatusText);
            }}
            onError={(error) => {
              console.log('onError');
              console.log('error', error);
            }}
            onFinish={(uploadDetails) => {
              console.log('onFinish');
              console.log('uploadDetails', uploadDetails);
            }}
          />

          <div style={{marginTop: 24}}>
            <RaisedButton
              label='Save article'
              type='submit'
              style={{ width: 150, display: 'block',  margin: 'auto' }}
              secondary
            />
          </div>

          <Snackbar
            open={error !== null}
            message={errorMessage(error)}
            autoHideDuration={DEFAULT_AUTO_HIDE_DURATION}
            onRequestClose={onNewArticleClear}
          />

        </Formsy>
      </div>
    )
  }
}

export default connect(
  state => ({...state.newArticle}),
  ({saveNewArticleIfNeeded, onNewArticleClear, pushDashboard})
)(NewArticleView);
