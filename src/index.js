import React from 'react';
import { render } from 'react-dom';
import {store, history} from "./app/store";
import Root from "./layouts/Root";

render(
  (<Root store={store} history={history}/>),
  document.getElementById('root')
);
