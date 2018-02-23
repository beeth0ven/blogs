import React, { Component } from "react";
import {Link} from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import {connect} from "react-redux";
import {logoutIfNeeded} from "../actions/login";

class LogoutView extends Component {

  componentDidMount() {
    this.props.logoutIfNeeded()
  }

  render() {

    return (
      <div style={{ width: 300, margin: '0 auto' }}>
        <h3>Logout success!</h3>
        <Link to='/'>
          <RaisedButton
            style={{width: 300}}
            secondary
            label='Done'
          />
        </Link>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  ({ logoutIfNeeded })
)(LogoutView);

