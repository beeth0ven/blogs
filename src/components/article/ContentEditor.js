import React, { Component } from 'react';
import editorStyles from "./EditorStyles";
import {Editor} from "draft-js";

class ContentEditor extends Component {

  render() {

    const { editorState, onEditorStateChange } = this.props;

    return (
      <div style={editorStyles.editorDiv} onClick={() => this.refs.editor.focus()} >
        <Editor
          style={editorStyles.editor}
          editorState={editorState}
          onChange={onEditorStateChange}
          ref={'editor'}
        />
      </div>
    )
  }
}

export default ContentEditor;