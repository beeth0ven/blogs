import React from 'react'
import {RaisedButton} from "material-ui";

const DashView = ({message, onDoneClick}) => (
  <div style={{ width: 300, margin: '0 auto' }}>
    <h3>{message}</h3>
    <RaisedButton
      style={{width: 300}}
      secondary
      label='Done'
      onClick={onDoneClick}
    />
  </div>
);

export default DashView;