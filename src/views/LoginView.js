import React from 'react';
import { LoginForm } from '../components/LoginForm';
import falcorModel from "../falcorModel";
import {connect} from "react-redux";
import {Snackbar} from "material-ui";

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

    if (tokenRes === 'INVALID') {
      const errorRes = await falcorModel.getValue('login.error');
      this.setState({error: errorRes});
      return;
    }

    if (tokenRes) {
      const username = await falcorModel.getValue('login.username');
      const role = await falcorModel.getValue('login.role');

      localStorage.setItem('token', tokenRes);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);

      this.props.history.pushState(null, '/dashboard');
    }
  };

  render() {
    return (
      <div>
        <div style={{maxWidth: 450, margin: '0 auto'}}>
          <LoginForm onSubmit={this.login}/>
        </div>
        <Snackbar
          autoHideDuration={4000}
          open={this.state.error !== null}
          message={this.state.error || ''}
          onRequestClose={() => this.setState({error: null})}
        />
      </div>
    )
  }
}

export default connect(
  state => ({...state}),
  dispatch => ({})
)(LoginView);