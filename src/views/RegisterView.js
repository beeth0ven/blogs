import React, { Component } from 'react'
import RegisterForm from "../components/RegisterForm";
import {connect} from "react-redux";

class RegisterView extends Component {

  onSubmit = (formInfo) => {
    console.log('formInfo', formInfo)
  };

  render() {

    return (
      <div style={{maxWidth: 450, margin: '0 auto'}}>
        <RegisterForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(RegisterView);