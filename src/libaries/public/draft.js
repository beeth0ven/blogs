import {convertToRaw, convertFromRaw, EditorState} from 'draft-js/lib/Draft';

const contentRawFromEditorState = (editorState) => {
  const content = editorState.getCurrentContent();
  return convertToRaw(content);
};

const editorStateFromContentRaw = (contentRaw) => {
  const content = convertFromRaw(contentRaw);
  return EditorState.createWithContent(content);
};

export {contentRawFromEditorState, editorStateFromContentRaw};