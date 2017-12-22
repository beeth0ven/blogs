import {combineReducers} from "redux";
import {routeReducer} from "redux-simple-router";
import articles from "./articles";

export default combineReducers({
  routing: routeReducer,
  articles
})