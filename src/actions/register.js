import falcorModel from '../falcorModel';

const ON_REGISTER_EXECUTING = 'ON_REGISTER_EXECUTING';
const ON_REGISTER_SUCCESS   = 'ON_REGISTER_SUCCESS';
const ON_REGISTER_ERROR     = 'ON_REGISTER_ERROR';
const ON_REGISTER_CLEAR     = 'ON_REGISTER_RESET';

const onRegisterExecuting = () => ({
  type: ON_REGISTER_EXECUTING
});

const onRegisterSuccess = (newUserId) => ({
  type: ON_REGISTER_SUCCESS,
  data: newUserId
});

const onRegisterError = (error) => ({
  type: ON_REGISTER_ERROR,
  error
});

const onRegisterClear = () => ({
  type: ON_REGISTER_CLEAR
});

const registerIfNeeded = (formInfo) => async (dispatch, getState) => {
  const shouldRegister = !getState().register.isExecuting;
  if (!shouldRegister) { return }

  dispatch(onRegisterExecuting());

  try {
    await falcorModel.call('register', [formInfo]);
    const newUserId = await falcorModel.getValue('register.newUserId');
    dispatch(onRegisterSuccess(newUserId));
  } catch (error) {
    dispatch(onRegisterError(error));
  }
};

export {
  ON_REGISTER_EXECUTING,
  ON_REGISTER_SUCCESS,
  ON_REGISTER_ERROR,
  ON_REGISTER_CLEAR,
  onRegisterExecuting,
  onRegisterSuccess,
  onRegisterError,
  onRegisterClear,
  registerIfNeeded,
};