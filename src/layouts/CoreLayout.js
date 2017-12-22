import React from 'react';
import { Link } from 'react-router';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import getMuiTheme from "material-ui/lib/styles/getMuiTheme";
import {AppBar, RaisedButton} from "material-ui";
import ActionHome from "material-ui/lib/svg-icons/action/home";

class CoreLayout extends React.Component {

  render() {
    const homeIconStyle = {
      margin: 5,
      padding: 5
    };
    const buttonStyle = {
      margin: 5
    };

    const homePageButtonJSX = (
      <Link to='/'>
        <RaisedButton label={<ActionHome/>} style={homeIconStyle}/>
      </Link>
    );

    const menuLinksJSX = (
      <span>
        <Link to='/register'>
          <RaisedButton label='Register' style={buttonStyle}/>
        </Link>
        <Link to='Login'>
          <RaisedButton label='Login' style={buttonStyle}/>
        </Link>
      </span>
    );

    return (
      <div>
        <AppBar
          title='Publishing App'
          iconElementLeft={homePageButtonJSX}
          iconElementRight={menuLinksJSX}
        />
        <br/>
        {this.props.children}
      </div>
    )
  }
}

const muiTheme = getMuiTheme(null, { userAgent: 'all' });
export default themeDecorator(muiTheme)(CoreLayout);