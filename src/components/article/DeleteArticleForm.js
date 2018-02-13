import React from 'react';
import ConfirmButton from "../ConfirmButton";

const DeleteArticleForm = ({onConfirmDelete}) => (
  <ConfirmButton
    label='Delete'
    confirmLabel='Confirm delete this article.'
    onConfirm={onConfirmDelete}
  />
);

export default DeleteArticleForm;