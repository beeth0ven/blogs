import React from 'react';
import ContentEditor from "./ContentEditor";
import DefaultInput from "../DefaultInput";
import RaisedButton from "material-ui/RaisedButton";
import Formsy from 'formsy-react';

const UpdateArticleForm = ({article, editorState, onEditorStateChange, onSubmit, }) => (
  <Formsy onSubmit={onSubmit}>

    <DefaultInput
      title='Title'
      name='title'
      type='text'
      initialValue={article.title}
      required
    />

    <DefaultInput
      title='Content'
      name='content'
      type='text'
      initialValue={article.content}
      required
    />

    <ContentEditor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
    />

    <div style={{marginTop: 24}}>
      <RaisedButton
        label='Update article'
        type='submit'
        style={{ width: 200, display: 'block', margin: 'auto' }}
        secondary
      />
    </div>

  </Formsy>
);

export default UpdateArticleForm;