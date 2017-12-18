import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from "history/lib/createBrowserHistory";
import {syncReduxAndRouter} from "redux-simple-router";
import Root from "./containers/Root";
import configureStore from "./store/configureStore";

const history = createBrowserHistory();
const store = configureStore(window.__INITIAL_STATE__);

syncReduxAndRouter(history, store);

render(
  <Root history={history} store={store}/>,
  document.getElementById('publishingAppRoot')
 );

export { store };