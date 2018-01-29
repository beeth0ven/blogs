
import {
  ON_LOGIN_CLEAR,
  ON_LOGIN_ERROR,
  ON_LOGIN_EXECUTING,
  ON_LOGIN_SUCCESS
} from "../actions/login";

const empty = {
  user: null,
  isExecuting: false,
  error: null
};

const login = (state = empty, action) => {
  switch (action.type) {
    case ON_LOGIN_EXECUTING:
      return {
        user: null,
        isExecuting: true,
        error: null
      };
    case ON_LOGIN_SUCCESS:
      return {
        user: action.data,
        isExecuting: false,
        error: null
      };
    case ON_LOGIN_ERROR:
      return {
        user: null,
        isExecuting: false,
        error: action.error
      };
    case ON_LOGIN_CLEAR:
      return empty;
    default:
      return state
  }
};

export default login;