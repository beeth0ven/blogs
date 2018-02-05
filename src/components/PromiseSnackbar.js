import React from 'react';
import {DEFAULT_AUTO_HIDE_DURATION} from "../config";
import {Snackbar} from "material-ui";

const PromiseSnackbar = (
  {
    error,
    errorMessage,
    autoHideErrorDuration = DEFAULT_AUTO_HIDE_DURATION,
    onRequestErrorClose,
    value,
    valueMessage,
    action,
    autoHideValueDuration = DEFAULT_AUTO_HIDE_DURATION,
    onRequestValueClose,
    onActionClick
  }
) => {

  if (error) {
    return (<Snackbar
      open={error !== null}
      message={errorMessage}
      autoHideDuration={autoHideErrorDuration}
      onRequestClose={onRequestErrorClose}
    />);
  } else if (value) {
    return (<Snackbar
      open={true}
      message={valueMessage}
      action={action}
      autoHideDuration={autoHideValueDuration}
      onRequestClose={onRequestValueClose}
      onActionClick={onActionClick}
    />);
  } else {
    return (<div/>)
  }

};

export default PromiseSnackbar;