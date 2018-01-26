import {
  ON_REGISTER_CLEAR,
  ON_REGISTER_ERROR,
  ON_REGISTER_SUCCESS,
  ON_REGISTER_EXECUTING
} from "../actions/register";

const empty = {
  newUserId: null,
  isExecuting: false,
  error: null
};

const register = (state = empty, action) => {
  switch (action.type) {
    case ON_REGISTER_EXECUTING:
      return {
        newUserId: null,
        isExecuting: true,
        error: null
      };
    case ON_REGISTER_SUCCESS:
      return {
        newUserId: action.data,
        isExecuting: false,
        error: null
      };
    case ON_REGISTER_ERROR:
      return {
        newUserId: null,
        isExecuting: false,
        error: action.error
      };
    case ON_REGISTER_CLEAR:
      return empty;
    default:
      return state
  }
};

export default register;