import React from 'react';
import { Link } from 'react-router';
import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import getMuiTheme from "material-ui/lib/styles/getMuiTheme";

class CoreLayout extends React.Component {

  render() {
    return (
      <div>
        <span>
          Links: <Link to='/register'>Register</Link> | <Link to='/login'>Login</Link> | <Link to='/'>Home Page</Link>
        </span>
        <br/>
        {this.props.children}
      </div>
    )
  }
}

const muiTheme = getMuiTheme(null, { userAgent: 'all' });
export default themeDecorator(muiTheme)(CoreLayout);