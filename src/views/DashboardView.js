import React from 'react';
import {connect} from "react-redux";

class DashboardView extends React.Component {

  render() {
    return (
      <div>
        <h1>Dashboard - loggedin!</h1>
      </div>
    )
  }
}

export default connect(
  state => ({...state}),
  dispatch => ({})
)(DashboardView)