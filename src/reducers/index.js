import {combineReducers} from "redux";
import article from './article';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  article,
  routing
});

export default rootReducer;