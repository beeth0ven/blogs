import React from 'react';
import {Route, IndexRoute} from "react-router";
import CoreLayout from "./CoreLayout";
import App from "../views/App";
import LoginView from "../views/LoginView";
import Dashboard from "../views/Dashboard";
import Register from "../views/RegisterView";

const routes = (
    <Route component={CoreLayout} path='/'>
      <IndexRoute component={App} name='app'/>
      <Route component={Dashboard} path='dashboard' name='dashboard'/>
      <Route component={LoginView} path='login' name='login'/>
      <Route component={Register} path='register' name='register'/>
    </Route>
);

export default routes;