import React, { Component } from 'react';
import {Paper} from "material-ui";
import DefaultInput from "./DefaultInput";
import Formsy from 'formsy-react';

class LoginForm extends Component {

  render() {
    return (
      <div>
          <Paper style={{padding: 32}}>
            <DefaultInput
              title='Username'
              name='username'
              required={true}
              type={'text'}
            />
          </Paper>
      </div>
      )
  }
}

export default LoginForm;