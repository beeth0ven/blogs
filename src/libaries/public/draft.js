import {convertToRaw, convertFromRaw, ContentState, EditorState} from 'draft-js';

const contentRawFromEditorState = (editorState) => {
  const content = editorState.getCurrentContent();
  return convertToRaw(content);
};

const editorStateFromContentRaw = (contentRaw) => {
  const content = convertFromRaw(contentRaw);
  return EditorState.createWithContent(content);
};

export {contentRawFromEditorState, editorStateFromContentRaw};