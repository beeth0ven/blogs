
import newArticleReducerBuilder from "../reducerBuilders/newArticleReducerBuilder";
import falcorModel from '../services/falcorModel';

const { onExecuting, onSuccess, onError, onClear } = newArticleReducerBuilder.createActions();

const saveNewArticleIfNeeded = (articleInfo) => async (dispatch, getState) => {
  const shouldSave = !getState().newArticle.isExecuting;
  if (!shouldSave) { return; }
  dispatch(onExecuting());
  try {
    await falcorModel.call(['article', 'new'], [articleInfo]);
    const newArticleId = await falcorModel.getValue(['article', 'new', '_id']);
    dispatch(onSuccess(newArticleId));
  } catch (error) {
    dispatch(onError(error));
  }
};

export {
  onExecuting as onNewArticleExecuting,
  onSuccess as onNewArticleSuccess,
  onError as onNewArticleError,
  onClear as onNewArticleClear,
  saveNewArticleIfNeeded,
};