import React from 'react';
import { Link } from 'react-router';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import getMuiTheme from "material-ui/lib/styles/getMuiTheme";
import {AppBar, RaisedButton, Snackbar} from "material-ui";
import ActionHome from "material-ui/lib/svg-icons/action/home";
import {errorSubject} from "../falcorModel";

class CoreLayout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMsg: null
    };

    if (typeof window !== 'undefined') {
      errorSubject.subscribe({onNext: this.onFalcorError});
    }
  };

  onFalcorError = ({ errorValue, path }) => {
    const errorMsg = `Error: ${errorValue} (path ${JSON.stringify(path)})`;
    this.setState({errorMsg});
  };

  style = {
    homeIcon: {
      margin: 5,
      padding: 5
    },
    button: {
      margin: 5
    }
  };

  homePageButtonJSX = () => (
    <Link to='/'>
      <RaisedButton label={<ActionHome/>} style={this.style.homeIcon}/>
    </Link>
  );

  loggedInMenuLinksJSX = () => (
    <span>
      <Link to='/dashboard'>
        <RaisedButton label='Dashboard' style={this.style.button}/>
      </Link>
      <Link to='/logout'>
        <RaisedButton label='Logout' style={this.style.button}/>
      </Link>
    </span>
  );

  loggedOutMenuLinksJSX = () => (
    <span>
      <Link to='/register'>
        <RaisedButton label='Register' style={this.style.button}/>
      </Link>
      <Link to='/login'>
        <RaisedButton label='Login' style={this.style.button}/>
      </Link>
    </span>
  );

  userIsLoggedIn = () => typeof localStorage !== 'undefined'
    && localStorage.token
    && this.props.routes[1].name !== 'logout';

  menuLinksJSX = () => this.userIsLoggedIn()
    ? this.loggedInMenuLinksJSX()
    : this.loggedOutMenuLinksJSX();

  errorSnackbarJSX = () => (this.state.errorMsg === null)
    ? null
    : <Snackbar
        open={true}
        message={this.state.errorMsg}
        autoHideDuration={8000}
        onRequestClose={() => console.log('You can add custom on close code')}
    />;

  render() {

    return (
      <div>
        {this.errorSnackbarJSX()}
        <AppBar
          title='Publishing App'
          iconElementLeft={this.homePageButtonJSX()}
          iconElementRight={this.menuLinksJSX()}
        />
        <br/>
        {this.props.children}
      </div>
    )
  }
}

const muiTheme = getMuiTheme(null, { userAgent: 'all' });
export default themeDecorator(muiTheme)(CoreLayout);