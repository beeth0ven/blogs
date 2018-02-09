import updateArticleReducerBuilder from "../reducerBuilders/updateArticleReducerBuilder";
import falcorModel from "../services/falcorModel";
import {onUpdatedArticle} from "./article";
import {pushUpdateArticleSuccess} from "./router";

const { onExecuting, onSuccess, onError, onClear } = updateArticleReducerBuilder.createActions();

const updateArticleIfNeeded = (articleInfo) => async (dispatch, getState) => {
  const shouldUpdateArticle = !getState().updateArticle.isExecuting;
  if (!shouldUpdateArticle) { return; }
  dispatch(onExecuting());
  try {
    await falcorModel.call(['article', 'update'], [articleInfo]);
    dispatch(onSuccess(articleInfo._id));
    dispatch(onUpdatedArticle(articleInfo));
    dispatch(pushUpdateArticleSuccess())
  } catch (error) {
    dispatch(onError(error));
  }
};

export {
  onExecuting as onUpdateArticleExecuting,
  onSuccess as onUpdateArticleSuccess,
  onError as onUpdateArticleError,
  onClear as onUpdateArticleClear,
  updateArticleIfNeeded,
};