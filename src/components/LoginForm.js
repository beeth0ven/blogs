import React from 'react';
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import DefaultInput from "./DefaultInput";
import Formsy from 'formsy-react';

const LoginForm = ({ onSubmit }) => (
  <Formsy onSubmit={onSubmit}>
    <Paper zDepth={1} style={{padding: 32}}>

      <DefaultInput
        title='Username'
        name='username'
        type='text'
        required
      />

      <DefaultInput
        title='Password'
        name='password'
        type='password'
        required
      />

      <div style={{marginTop: 24}}>
        <RaisedButton
          secondary
          type='submit'
          style={{
            margin: '0 auto',
            display: 'block',
            width: 150
          }}
          label='Log in'
        />
      </div>

    </Paper>
  </Formsy>
);

export default LoginForm;