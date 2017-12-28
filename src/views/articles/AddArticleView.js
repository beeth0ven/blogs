import React from 'react';
import {connect} from 'react-redux';
import WYSIWYGeditor from "../../components/articles/WYSIWYGeditor";
import { stateToHTML } from 'draft-js-export-html';

class AddArticleView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentJSON: {},
      htmlContent: ''
    };
  }

  onDraftJSChange = (contentJSON, contentState) => {
    let htmlContent = stateToHTML(contentState);
    this.setState({contentJSON, htmlContent});
  };

  render() {
    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <h1>Add Article</h1>
        <WYSIWYGeditor
          initialValue=''
          title='Create an article'
          onChangeTextJSON={this.onDraftJSChange}
        />
      </div>
    )
  }
}

export default connect(
  state => ({...state}),
  dispatch => ({})
)(AddArticleView)