import rootReducer from "../reducers";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {createHashHistory} from "history";
import {routerMiddleware, syncHistoryWithStore} from "react-router-redux";

const hashHistory = createHashHistory();
const router = routerMiddleware(hashHistory);

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    router,
    logger
  )
);

const history = syncHistoryWithStore(hashHistory, store);

export { store, history };