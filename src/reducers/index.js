import {combineReducers} from "redux";
import article from './article';
import register from "./register";
import login from "./login";
import { routerReducer as routing } from 'react-router-redux';
import newArticleReducerBuilder from "../reducerBuilders/newArticleReducerBuilder";
import updateArticleReducerBuilder from "../reducerBuilders/updateArticleReducerBuilder";

const newArticle = newArticleReducerBuilder.createReducer();
const updateArticle = updateArticleReducerBuilder.createReducer();

const rootReducer = combineReducers({
  article,
  newArticle,
  updateArticle,
  register,
  login,
  routing,
});

export default rootReducer;