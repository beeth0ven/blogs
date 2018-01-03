import React from 'react';
import {
  EditorState,
  ContentState,
  RichUtils,
  Editor,
  convertToRaw,
  convertFromRaw
} from 'draft-js'
import {BlockStyleControls, InlineStyleControls} from "./wysiwyg/WYSIWYGbuttons";

class WYSIWYGeditor extends React.Component {

  constructor(props) {
    super(props);

    const { initialValue } = props;

    let initialEditorFromProps;

    const notHasInitialValue = typeof initialValue === 'undefined'
      || typeof initialValue !== 'object';
    if (notHasInitialValue) {
      initialEditorFromProps = EditorState
        .createWithContent(ContentState.createFromText(''));
    } else {
      const isInvalidObject = typeof initialValue.entityMap === 'undefined'
        || typeof initialValue.blocks === 'undefined';

      if (isInvalidObject) {
        alert('Invalid article-edit error provided, exit');
        return;
      }

      const draftBlocks = convertFromRaw(initialValue);
      const contentToConsume = ContentState.createFromBlockArray(draftBlocks);
      initialEditorFromProps = EditorState.createWithContent(contentToConsume);
    }

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

  toggleBlockType = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  };

  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  };

  render() {
    const { editorState } = this.state;
    const className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();

    return (
      <div>
        <h4>{this.props.title}</h4>
        <div className='RichEditor-root'>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />

          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />

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