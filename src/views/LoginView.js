import React, { Component } from 'react'
import {connect} from "react-redux";
import LoginForm from "../components/LoginForm";
import falcorModel from "../falcorModel";

class LoginView extends Component {

  onSubmit = async (formInfo) => {
    console.log('formInfo', formInfo);

  };

  render() {

    return (
      <div>
        <div style={{ maxWidth: 450, margin: '0 auto' }}>
          <LoginForm onSubmit={this.onSubmit}/>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(LoginView);