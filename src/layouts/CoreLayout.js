import React, {Component} from 'react';
import {AppBar, RaisedButton} from "material-ui";
import {Link} from "react-router";
import {ActionHome} from "material-ui/svg-icons/index.es";

class CoreLayout extends Component {

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

  isUserLoggedIn = () => false;

  menuLinks = () => this.isUserLoggedIn()
    ? this.logoutLinks()
    : this.loginLinks();

  loginLinks = () => (
    <span>
      <Link to='/login'>
        <RaisedButton label='Login' style={this.styles.menuButton} />
      </Link>
      <Link to='/register'>
        <RaisedButton label='Register' style={this.styles.menuButton}/>
      </Link>
    </span>
  );

  logoutLinks = () => (
    <span>
      <Link to='/dashboard'>
        <RaisedButton label='Dashboard'/>
      </Link>
      <Link to='/logout'>
        <RaisedButton label='Loggout'/>
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

export default CoreLayout;

