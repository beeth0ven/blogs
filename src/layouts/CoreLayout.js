import React, {Component} from 'react';
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import {Link} from "react-router";
import ActionHome from "material-ui/svg-icons/action/home";
import {connect} from "react-redux";
import {pullLoginStateFromLocalStorage} from "../actions/login";

class CoreLayout extends Component {

  componentDidMount() {
    this.props.pullLoginStateFromLocalStorage()
  }

  styles = {
    homeButton: {
      margin: 5,
    },
    menuButton: {
      margin: 5,
    }
  };

  homeBarButton = () => (
    <Link to='/'>
      <RaisedButton icon={<ActionHome/>} style={this.styles.homeButton}/>
    </Link>
  );

  menuLinks = () => this.props.isUserLoggedIn
    ? this.logoutLinks()
    : this.loginLinks();

  loginLinks = () => (
    <span>
      <Link to='/login'>
        <RaisedButton label='Login' style={this.styles.menuButton}/>
      </Link>
      <Link to='/register'>
        <RaisedButton label='Register' style={this.styles.menuButton}/>
      </Link>
    </span>
  );

  logoutLinks = () => (
    <span>
      <Link to='/dashboard'>
        <RaisedButton label='Dashboard' style={this.styles.menuButton}/>
      </Link>
      <Link to='/logout'>
        <RaisedButton label='Logout' style={this.styles.menuButton}/>
      </Link>
    </span>
  );

  render() {
    return (
      <div>
        <AppBar
          title={'Publishing App'}
          iconElementLeft={this.homeBarButton()}
          iconElementRight={this.menuLinks()}
        />
        <br/>
        {this.props.children}
      </div>
    )
  }
}

export default connect(
  state => ({ isUserLoggedIn: state.login.user !== null }),
  ({ pullLoginStateFromLocalStorage })
)(CoreLayout);

