import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import {TextField} from "material-ui";

class DefaultInput extends Component {

  constructor() {
    super();

    this.state = {
      text: ''
    }
  };

  onTextFieldChange = (event) => {
    this.setState({text: event.target.value});
    this.props.setValue(event.target.value);
  };

  render() {
    const { name, title, required, type, defaultValue } = this.props;
    return (
      <div>
        <TextField
          ref={name}
          floatingLabelText={title}
          name={name}
          onChange={this.onTextFieldChange}
          required={required}
          type={type}
          value={this.state.text || ''}
          defaultValue={defaultValue}
        />
        {this.props.children}
      </div>
    );
  }
}

export default withFormsy(DefaultInput);