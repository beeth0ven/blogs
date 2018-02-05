import {combineReducers} from "redux";
import article from './article';
import register from "./register";
import login from "./login";
import { routerReducer as routing } from 'react-router-redux';
import newArticleReducerBuilder from "../reducerBuilders/newArticleReducerBuilder";

const newArticle = newArticleReducerBuilder.createReducer();

const rootReducer = combineReducers({
  article,
  newArticle,
  register,
  login,
  routing,
});

export default rootReducer;