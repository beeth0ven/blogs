import React from 'react';
import { Provider } from "react-redux";
import routes from "./routes";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Router} from "react-router";

const Root = ({ store, history }) => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history} routes={routes}/>
    </Provider>
  </MuiThemeProvider>
);

export default Root;