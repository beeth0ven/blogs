import React, { Component } from 'react'
import RegisterForm from "../components/RegisterForm";
import {connect} from "react-redux";
import {onRegisterClear, registerIfNeeded} from "../actions/register";
import {Snackbar} from "material-ui";
import {errorMessage} from "../libaries/public/error";
import {pushLogin} from "../actions/router";

const RegisterView = ({ newUserId, error, registerIfNeeded, onRegisterClear, pushLogin }) => {

  const pushLoginAndClear = () => {
    onRegisterClear();
    pushLogin();
  };

  return (
    <div>
      <div style={{maxWidth: 450, margin: '0 auto'}}>
        <RegisterForm onSubmit={registerIfNeeded}/>
      </div>
      <Snackbar
        open={error !== null}
        message={errorMessage(error)}
        autoHideDuration={4000}
        onRequestClose={onRegisterClear}
      />
      <Snackbar
        open={newUserId !== null}
        message={'Register success!'}
        action='Login'
        autoHideDuration={4000}
        onActionClick={pushLoginAndClear}
        onRequestClose={pushLoginAndClear}
      />
    </div>
  )
};

export default connect(
  state => ({...state.register}),
  ({registerIfNeeded, onRegisterClear, pushLogin})
)(RegisterView);