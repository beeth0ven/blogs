import React, { Component } from 'react';
import {connect} from "react-redux";
import {EditorState, Editor, convertToRaw} from "draft-js";
import {RaisedButton} from "material-ui";
import falcorModel from "../../services/falcorModel";
import Formsy from 'formsy-react';
import editorStyles from './EditorStyles';
import DefaultInput from "../../components/DefaultInput";

class NewArticleView extends Component {

  constructor() {
    super();

    const initialValue = '123';

    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onChange = (editorState) => {
    this.setState({editorState});
  };

  onSubmit = async (formInfo) => {
    console.log('onSubmit');

    const content = this.state.editorState.getCurrentContent();
    const contentRaw = convertToRaw(content);

    const articleInfo = {
      ...formInfo,
      contentRaw
    };

    console.log('content', content);
    console.log('contentRaw', contentRaw);
    console.log('articleInfo', articleInfo);

    try {
      await falcorModel.call(['article', 'new'], [articleInfo]);
      const newArticleId = await falcorModel.getValue(['article', 'new', '_id']);
      console.log('newArticleId', newArticleId);
    } catch (error) {
      console.error(error);
    }
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

          <div style={editorStyles.editorDiv} onClick={() => this.refs.editor.focus()} >
            <Editor
              style={editorStyles.editor}
              editorState={this.state.editorState}
              onChange={this.onChange}
              ref={'editor'}
            />
          </div>

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
  state => ({})
)(NewArticleView);
