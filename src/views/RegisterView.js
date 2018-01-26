import React, { Component } from 'react'
import RegisterForm from "../components/RegisterForm";
import {connect} from "react-redux";
import {onClearError, registerIfNeeded} from "../actions/register";
import {Snackbar} from "material-ui";
import {errorMessage} from "../libaries/public/error";

class RegisterView extends Component {

  onSubmit = async (formInfo) => {
    console.log('formInfo', formInfo);
    this.props.registerIfNeeded(formInfo);
  };

  render() {
    console.log('props', this.props);
    return (
      <div>
        <div style={{maxWidth: 450, margin: '0 auto'}}>
          <RegisterForm onSubmit={this.onSubmit}/>
        </div>
        <Snackbar
          open={this.props.error !== null}
          message={errorMessage(this.props.error)}
          autoHideDuration={4000}
          onRequestClose={this.props.onClearError}
        />
      </div>
    )
  }
}

export default connect(
  state => ({...state.register}),
  ({registerIfNeeded, onClearError})
)(RegisterView);