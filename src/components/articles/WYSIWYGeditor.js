import React from 'react';
import {
  EditorState,
  ContentState,
  RichUtils,
  Editor,
  convertToRaw,
  convertFromRaw
} from 'draft-js'

class WYSIWYGeditor extends React.Component {

  constructor(props) {
    super(props);

    const initialEditorFromProps = EditorState
      .createWithContent(ContentState.createFromText(''));

    this.state = {
      editorState: initialEditorFromProps
    }
  }

  onChange = (editorState) => {
    let contentState = editorState.getCurrentContent();

    let contentJSON = convertToRaw(contentState);
    this.props.onChangeTextJSON(contentJSON, contentState);

    this.setState({editorState});
  };

  focus = () => this.refs['refWYSIWYGeditor'].focus();

  handleKeyCommand = (command) => {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState);

    if (newState) {
      this.onChange(newState);
      return true
    }
    return false;
  };

  render() {
    const { editorState } = this.state;
    const className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();

    return (
      <div>
        <h4>{this.props.title}</h4>
        <div className='RichEditor-root'>
          <div className={className} onClick={this.focus}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              ref={'refWYSIWYGeditor'}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default WYSIWYGeditor;