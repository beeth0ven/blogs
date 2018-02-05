import React, { Component } from 'react'
import {connect} from "react-redux";
import LoginForm from "../components/LoginForm";
import {loginIfNeeded, onLoginClear} from "../actions/login";
import {Snackbar} from "material-ui";
import {errorMessage} from "../libaries/public/error";
import {pushDashboard} from "../actions/router";
import {DEFAULT_AUTO_HIDE_DURATION} from "../config";


const LoginView = ({ user, error, loginIfNeeded, onLoginClear, pushDashboard }) => (
  <div>
    <div style={{ maxWidth: 450, margin: '0 auto' }}>
      <LoginForm onSubmit={loginIfNeeded}/>
    </div>
    <Snackbar
      open={error !== null}
      message={errorMessage(error)}
      autoHideDuration={DEFAULT_AUTO_HIDE_DURATION}
      onRequestClose={onLoginClear}
    />
    <Snackbar
      open={user !== null}
      message='Login success!'
      action='Dashboard'
      autoHideDuration={DEFAULT_AUTO_HIDE_DURATION}
      onActionClick={pushDashboard}
      onRequestClose={pushDashboard}
    />
  </div>
);

export default connect(
  state => ({...state.login}),
  ({onLoginClear, loginIfNeeded, pushDashboard})
)(LoginView);