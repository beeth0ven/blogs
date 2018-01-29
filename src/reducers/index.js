import {combineReducers} from "redux";
import article from './article';
import register from "./register";
import login from "./login";
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  article,
  register,
  login,
  routing,
});

export default rootReducer;