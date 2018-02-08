
import deleteArticleReducerBuilder from "../reducerBuilders/deleteArticleReducerBuilder";
import falcorModel from '../services/falcorModel';
import {onDeletedArticle} from "./article";

const { onExecuting, onSuccess, onError, onClear } = deleteArticleReducerBuilder.createActions();

const deleteArticleIfNeeded = (id) => async (dispatch, getState) => {
  const shouldDelete = !getState().deleteArticle.isExecuting;
  if (!shouldDelete) { return; }
  dispatch(onExecuting());
  try {
    await falcorModel.call(['article', 'delete'], [id]);
    dispatch(onSuccess(id));
    dispatch(onDeletedArticle(id));
  } catch (error) {
    dispatch(onError(error));
  }
};

export {
  onExecuting as onDeleteArticleExecuting,
  onSuccess as onDeleteArticleSuccess,
  onError as onDeleteArticleError,
  onClear as onDeleteArticleClear,
  deleteArticleIfNeeded,
};