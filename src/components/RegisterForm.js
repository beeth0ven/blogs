import React from 'react';
import Formsy from 'formsy-react';
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import DefaultInput from "./DefaultInput";

const RegisterForm = ({ onSubmit }) => (
  <Formsy onSubmit={onSubmit}>
    <Paper zDepth={1} style={{padding: 32}}>

      <DefaultInput
        title='Email'
        name='email'
        type='text'
        required
      />

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
          label='Register'
          type='submit'
          style={{
            width: 150,
            display: 'block',
            margin: '0 auto'
          }}
          secondary
        />
      </div>

    </Paper>
  </Formsy>
);

export default RegisterForm;
