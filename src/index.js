import React from 'react';
import { render } from 'react-dom';
import store from "./app/store";
import history from './app/history';
import Root from "./layouts/Root";

render(
  (<Root store={store} history={history}/>),
  document.getElementById('root')
);
