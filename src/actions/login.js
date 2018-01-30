import falcorModel from "../services/falcorModel";
import * as localStorageService from "../services/localStorageService";

const ON_LOGIN_EXECUTING = 'ON_LOGIN_EXECUTING';
const ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS';
const ON_LOGIN_ERROR = 'ON_LOGIN_ERROR';
const ON_LOGIN_CLEAR = 'ON_LOGIN_CLEAR';

const onLoginExecuting = () => ({
  type: ON_LOGIN_EXECUTING
});

const onLoginSuccess = (user) => ({
  type: ON_LOGIN_SUCCESS,
  data: user
});

const onLoginError = (error) => ({
  type: ON_LOGIN_ERROR,
  error
});

const onLoginClear = () => ({
  type: ON_LOGIN_CLEAR
});

const loginIfNeeded = (formInfo) => async (dispatch, getState) => {
  const state = getState().login;
  const shouldLogin = !state.isExecuting && state.user === null;
  if (!shouldLogin) { return }
  try {
    await falcorModel.call('login', [formInfo]);
    const user = await falcorModel.getValue('login.user');
    const token = await falcorModel.getValue('login.token');
    dispatch(onLoginSuccess(user));
    localStorageService.saveUserAndToken(user, token);
  } catch (error) {
    dispatch(onLoginError(error));
  }
};

const logoutIfNeeded = () => (dispatch, getState) => {
  const state = getState().login;
  const shouldLogout = !state.isExecuting && state.user !== null;
  if (!shouldLogout) { return }
  dispatch(onLoginClear());
  localStorageService.clearUserAndToken()
};

const pullLoginStateFromLocalStorage = () => (dispatch, getState) => {
  const state = getState().login;
  const shouldPull = !state.isExecuting;
  if (!shouldPull) { return }
  const { user, token } = localStorageService.getUserAndToken();
  if (user && token) {
    dispatch(onLoginSuccess(user));
  } else {
    dispatch(onLoginClear())
  }
};

export {
  ON_LOGIN_EXECUTING,
  ON_LOGIN_SUCCESS,
  ON_LOGIN_ERROR,
  ON_LOGIN_CLEAR,
  onLoginExecuting,
  onLoginSuccess,
  onLoginError,
  onLoginClear,
  loginIfNeeded,
  logoutIfNeeded,
  pullLoginStateFromLocalStorage,
}