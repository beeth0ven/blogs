import React from 'react';
import {connect} from "react-redux";
import {RegisterForm} from "../components/RegisterForm";
import falcorModel from "../falcorModel";
import {Snackbar} from "material-ui";

class RegisterView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  register = async (formInfo) => {
    console.info('newUserModel', formInfo);

    await falcorModel
      .call('register', [formInfo])
      .then(result => result);

    const newUserId = await falcorModel.getValue('register.newUserId');
    console.log('newUserId', newUserId);

    if (newUserId === 'INVALID') {
      const error = await falcorModel.getValue('register.error');
      this.setState({error: error});
      return
    }

    if (newUserId !== undefined) {
      console.log('Register success');
      this.props.history.pushState(null, '/login');
    }

  };


  render() {
    return (
      <div>
        <div style={{maxWidth: 450, margin: '0 auto'}}>
          <RegisterForm onSubmit={this.register}/>
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
)(RegisterView)