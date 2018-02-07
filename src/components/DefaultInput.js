import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import {TextField} from "material-ui";

class DefaultInput extends Component {

  constructor(props) {
    super(props);
    const { initialValue } = this.props;
    this.state = {
      text: initialValue || ''
    }
  };

  onTextFieldChange = (event) => {
    const text = event.target.value;
    this.setState({text});
    this.props.setValue(text);
  };

  render() {
    const { name, title, required, type } = this.props;
    return (
      <div>
        <TextField
          ref={name}
          floatingLabelText={title}
          name={name}
          onChange={this.onTextFieldChange}
          required={required}
          type={type}
          value={this.state.text}
        />
        {this.props.children}
      </div>
    );
  }
}

export default withFormsy(DefaultInput);