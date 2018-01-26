import falcorModel from '../falcorModel';

const ON_REGISTERING = 'ON_REGISTERING';
const ON_REGISTER_SUCCESS = 'ON_REGISTER_SUCCESS';
const ON_REGISTER_ERROR = 'ON_REGISTER_ERROR';
const ON_CLEAR_ERROR = 'ON_CLEAR_ERROR';

const onRegistering = () => ({
  type: ON_REGISTERING
});

const onRegisterSuccess = (newUserId) => ({
  type: ON_REGISTER_SUCCESS,
  data: newUserId
});

const onRegisterError = (error) => ({
  type: ON_REGISTER_ERROR,
  error
});

const onClearError = (error) => ({
  type: ON_CLEAR_ERROR
});

const registerIfNeeded = (formInfo) => async (dispatch, getState) => {
  const shouldRegister = !getState().register.isExecuting;
  if (shouldRegister) {
    dispatch(onRegistering());

    try {
      await falcorModel.call('register', [formInfo]);
      const newUserId = await falcorModel.getValue('register.newUserId');

      dispatch(onRegisterSuccess(newUserId));

    } catch (error) {
      dispatch(onRegisterError(error));
    }
  }
};

export {
  ON_REGISTERING,
  ON_REGISTER_SUCCESS,
  ON_REGISTER_ERROR,
  ON_CLEAR_ERROR,
  onRegistering,
  onRegisterSuccess,
  onRegisterError,
  onClearError,
  registerIfNeeded,
};