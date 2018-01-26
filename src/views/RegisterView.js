import React, { Component } from 'react'
import RegisterForm from "../components/RegisterForm";
import {connect} from "react-redux";
import {onRegisterClear, registerIfNeeded} from "../actions/register";
import {Snackbar} from "material-ui";
import {errorMessage} from "../libaries/public/error";
import {pushLogin} from "../actions/router";

class RegisterView extends Component {

  onSubmit = async (formInfo) => {
    console.log('formInfo', formInfo);
    this.props.registerIfNeeded(formInfo);
  };

  pushLogin = () => {
    this.props.onRegisterClear();
    this.props.pushLogin();
  };

  render() {
    return (
      <div>
        <div style={{maxWidth: 450, margin: '0 auto'}}>
          <RegisterForm onSubmit={this.onSubmit}/>
        </div>
        <Snackbar
          open={this.props.error !== null}
          message={errorMessage(this.props.error)}
          autoHideDuration={4000}
          onRequestClose={this.props.onRegisterClear}
        />
        <Snackbar
          open={this.props.newUserId !== null}
          message={'Register success!'}
          action='Login'
          autoHideDuration={4000}
          onActionClick={this.pushLogin}
          onRequestClose={this.pushLogin}
        />
      </div>
    )
  }
}

export default connect(
  state => ({...state.register}),
  ({registerIfNeeded, onRegisterClear, pushLogin})
)(RegisterView);