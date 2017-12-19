import React from 'react';
import { LoginForm } from '../components/LoginForm';
import falcorModel from "../falcorModel";
import {connect} from "react-redux";

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  login = async (credentials) => {
    console.info('credentials', credentials);

    await falcorModel
      .call(['login'], [credentials])
      .then((result) => result);

    const tokenRes = await falcorModel.getValue('login.token');
    console.info('tokenRes', tokenRes);
    // return;
  };

  render() {
    return (
      <div>
        <h1>Login view</h1>
        <div style={{maxWidth: 450, margin: '0 auto'}}>
          <LoginForm onSubmit={this.login}/>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({...state}),
  dispatch => ({})
)(LoginView);