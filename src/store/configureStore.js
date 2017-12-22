
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import {applyMiddleware, compose, createStore} from "redux";

export default (initialState, debug = false) => {
  let createStoreWithMiddleware;
  const middleware = applyMiddleware(thunk);

  createStoreWithMiddleware = compose(middleware);

  return createStoreWithMiddleware(createStore)(
    rootReducer,
    initialState
  );
}