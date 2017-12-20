
import React from 'react';
import {Form} from "formsy-react";
import {Paper, RaisedButton} from "material-ui";
import DefaultInput from "./DefaultInput";

export class RegisterForm extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Paper zDepth={1} style={{padding: 32}}>
          <h3>Registration form</h3>
          <DefaultInput
            onChange={(event) => {}}
            name='username'
            title='Username'
            required
          />

          <DefaultInput
            onChange={(event) => {}}
            name='firstName'
            title='First Name'
            required
          />

          <DefaultInput
            onChange={(event) => {}}
            name='lastName'
            title='Last Name'
            required
          />

          <DefaultInput
            onChange={(event) => {}}
            name='email'
            title='Email'
            required
          />

          <DefaultInput
            onChange={(event) => {}}
            type='password'
            name='password'
            title='Password'
            required
          />

          <div style={{marginTop: 24}}>
            <RaisedButton
              secondary={true}
              type='submit'
              style={{
                margin: '0 auto',
                display: 'block',
                width: 150
              }}
              label='Register'
            />
          </div>
        </Paper>
      </Form>
    )
  }
}