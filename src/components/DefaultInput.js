import React, { Component } from 'react';
import {HOC} from 'formsy-react';
import {TextField} from "material-ui";

class DefaultInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: null
    }
  }

  onTextFieldChange = (event) => {
    const { onChange, onTextChange } = this.props;
    this.setState({text: event.target.value});
    onChange(event);
    onTextChange(event.target.value);
  };

  render() {
    const { name, title, type, value, defaultValue, required, children } = this.props;
    return (
      <div>
        <TextField
          ref={name}
          name={name}
          floatingLabelText={title}
          type={type}
          required={required}
          value={this.state.text || value}
          onChange={this.onTextFieldChange}
          defaultValue={defaultValue}
        />
        {children}
      </div>
    )
  }
}

export default DefaultInput;