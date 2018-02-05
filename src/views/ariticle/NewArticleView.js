import React, { Component } from 'react';
import {connect} from "react-redux";
import {EditorState} from "draft-js";
import {RaisedButton} from "material-ui";
import Formsy from 'formsy-react';
import DefaultInput from "../../components/DefaultInput";
import ContentEditor from "../../components/article/ContentEditor";
import {contentRawFromEditorState} from "../../libaries/public/draft";
import {saveNewArticleIfNeeded} from "../../actions/newArticle";

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

  render() {

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

          <div style={{marginTop: 24}}>
            <RaisedButton
              style={{ width: 150, display: 'block',  margin: 'auto' }}
              label='Save article'
              type='submit'
              secondary
            />
          </div>

        </Formsy>
      </div>
    )
  }
}

export default connect(
  state => ({...state.newArticle}),
  ({saveNewArticleIfNeeded})
)(NewArticleView);
