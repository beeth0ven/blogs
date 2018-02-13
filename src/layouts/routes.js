import React from 'react';
import {Route, IndexRoute} from "react-router";
import CoreLayout from "./CoreLayout";
import App from "../views/App";
import LoginView from "../views/LoginView";
import Dashboard from "../views/Dashboard";
import Register from "../views/RegisterView";
import LogoutView from "../views/LogoutView";
import NewArticleView from "../views/ariticle/NewArticleView";
import UpdateArticleView from "../views/ariticle/UpdateArticleView";
import TestView from "../views/TestView";
import NewArticleSuccessView from "../views/ariticle/NewArticleSuccessView";
import UpdateArticleSuccessView from "../views/ariticle/UpdateArticleSuccessView";
import DeleteArticleSuccessView from "../views/ariticle/DeleteArticleSuccessView";
import ArticleNotFoundView from "../views/ariticle/ArticleNotFoundView";

const routes = (
    <Route component={CoreLayout} path='/'>
      <IndexRoute component={App} name='app'/>
      <Route component={Dashboard} path='dashboard' name='dashboard'/>
      <Route component={LoginView} path='login' name='login'/>
      <Route component={Register} path='register' name='register'/>
      <Route component={LogoutView} path='logout' name='logout'/>
      <Route component={NewArticleView} path='newArticle' name='newArticle'/>
      <Route component={NewArticleSuccessView} path='newArticleSuccess' name='newArticleSuccess'/>
      <Route component={UpdateArticleView} path='updateArticle/:_id' name='updateArticle'/>
      <Route component={UpdateArticleSuccessView} path='updateArticleSuccess' name='updateArticleSuccess'/>
      <Route component={DeleteArticleSuccessView} path='deleteArticleSuccess' name='deleteArticleSuccess'/>
      <Route component={ArticleNotFoundView} path='articleNotFound/:_id' name='articleNotFound'/>
      <Route component={TestView} path='test' name='test'/>
    </Route>
);

export default routes;