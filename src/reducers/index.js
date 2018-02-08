import {combineReducers} from "redux";
import article from './article';
import register from "./register";
import login from "./login";
import { routerReducer as routing } from 'react-router-redux';
import newArticleReducerBuilder from "../reducerBuilders/newArticleReducerBuilder";
import updateArticleReducerBuilder from "../reducerBuilders/updateArticleReducerBuilder";
import deleteArticleReducerBuilder from "../reducerBuilders/deleteArticleReducerBuilder";

const newArticle = newArticleReducerBuilder.createReducer();
const updateArticle = updateArticleReducerBuilder.createReducer();
const deleteArticle = deleteArticleReducerBuilder.createReducer();

const rootReducer = combineReducers({
  article,
  newArticle,
  updateArticle,
  deleteArticle,
  register,
  login,
  routing,
});

export default rootReducer;