import React, { Component } from 'react'
import {connect} from "react-redux";
import LoginForm from "../components/LoginForm";
import {loginIfNeeded, onLoginClear} from "../actions/login";
import {Snackbar} from "material-ui";
import {errorMessage} from "../libaries/public/error";
import {pushDashboard} from "../actions/router";

class LoginView extends Component {

  onSubmit = async (formInfo) => {
    console.log('formInfo', formInfo);
    this.props.loginIfNeeded(formInfo);
  };

  render() {
    const { user, error, onLoginClear, pushDashboard } = this.props;

    return (
      <div>
        <div style={{ maxWidth: 450, margin: '0 auto' }}>
          <LoginForm onSubmit={this.onSubmit}/>
        </div>
        <Snackbar
          open={error !== null}
          message={errorMessage(error)}
          autoHideDuration={4000}
          onRequestClose={onLoginClear}
        />
        <Snackbar
          open={user !== null}
          message='Login success!'
          action='Dashboard'
          autoHideDuration={4000}
          onActionClick={pushDashboard}
          onRequestClose={pushDashboard}
        />
      </div>
    )
  }
}

export default connect(
  state => ({...state.login}),
  ({onLoginClear, loginIfNeeded, pushDashboard})
)(LoginView);