import React, { Component } from 'react';
import Popover from "material-ui/Popover";
import RaisedButton from "material-ui/RaisedButton";

class ConfirmButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      popOpen: false,
    }
  }

  onClick = (event) => {
    event.preventDefault();
    this.setState({
      popOpen: true,
      anchorEl: event.currentTarget
    })
  };

  onClosePopover = () => {
    this.setState({popOpen: false})
  };

  onConfirm = () => {
    this.onClosePopover();
    this.props.onConfirm()
  };

  render() {
    const {label, confirmLabel} = this.props;
    const {popOpen, anchorEl} = this.state;
    return (
      <div>
        <RaisedButton
          label={label}
          onClick={this.onClick}
          secondary
        />

        <Popover
          open={popOpen}
          anchorEl={anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.onClosePopover}
        >
          <div style={{padding: 10}}>
            <RaisedButton
              label={confirmLabel}
              onClick={this.onConfirm}
              primary
            />
          </div>
        </Popover>
      </div>)
  }
}

export default ConfirmButton;