import {combineReducers} from "redux";
import article from './article';
import register from "./register";
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  article,
  register,
  routing,
});

export default rootReducer;