import {convertToRaw} from 'draft-js';

const contentRawFromEditorState = (editorState) => {
  const content = editorState.getCurrentContent();
  return convertToRaw(content)
};

export {contentRawFromEditorState};