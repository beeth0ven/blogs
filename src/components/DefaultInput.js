

import React from 'react';
import {TextField} from "material-ui";
import {HOC} from 'formsy-react';

class DefaultInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentText: null}
  }

  onTextFieldChange = event => {
    const { setValue, onChange } = this.props;
    this.setState({currentText: event.target.value});
    setValue(event.target.value);
    onChange(event);
  };

  render() {
    const { name, title, required, type, value, defaultValue } = this.props;
    return (
      <div>
        <TextField
          ref={name}
          floatingLabelText={title}
          name={name}
          onChange={this.onTextFieldChange}
          required={required}
          type={type}
          value={this.state.currentText || value}
          defaultValue={defaultValue}
        />
        {this.props.children}
      </div>
    );
  }
}

export default HOC(DefaultInput);