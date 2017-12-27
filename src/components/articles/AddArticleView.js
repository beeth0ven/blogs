import React from 'react';
import {connect} from 'react-redux';
import WYSIWYGeditor from "../../views/articles/WYSIWYGeditor";


class AddArticleView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Add Article</h1>
        <WYSIWYGeditor/>
      </div>
    )
  }
}

export default connect(
  state => ({...state}),
  dispatch => ({})
)(AddArticleView)