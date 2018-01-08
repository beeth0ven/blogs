import React from 'react';
import {connect} from 'react-redux';
import WYSIWYGeditor from "../../components/articles/WYSIWYGeditor";
import { stateToHTML } from 'draft-js-export-html';
import {newArticle} from "../../actions/article";
import {Link} from "react-router";
import {RaisedButton} from "material-ui";
import falcorModel from "../../falcorModel";

class AddArticleView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'test',
      contentJSON: {},
      htmlContent: '',
      newArticleID: null
    };
  }

  onDraftJSChange = (contentJSON, contentState) => {
    let htmlContent = stateToHTML(contentState);
    this.setState({contentJSON, htmlContent});
  };

  onSubmit = async () => {

    let newArticleObject = {
      articleTitle: this.state.title,
      articleContent: this.state.htmlContent,
      articleContentJSON: this.state.contentJSON
    };

    const newArticleID = await falcorModel
      .call('articles.add', [newArticleObject])
      .then((result) => falcorModel
        .getValue(['articles', 'newArticleID'])
        .then((newArticleID) => newArticleID)
      );

    newArticleObject['_id'] = newArticleID;
    this.props.newArticle(newArticleObject);
    this.setState({newArticleID});
  };

  render() {

    const styles = {
      rootDiv: {height: '100%', width: '75%', margin: 'auto'},
      raisedButton: {margin: '10px auto', display: 'block', width: 150}
    };

    if (this.state.newArticleID) {
      return (
        <div style={styles.rootDiv}>
          <h3>Your new article ID is {this.state.newArticleID}</h3>
          <Link to='/dashboard'>
            <RaisedButton
              secondary={true}
              type='submit'
              style={styles.raisedButton}
              label='Done'
            />
          </Link>
        </div>
      )
    }

    return (
      <div style={styles.rootDiv}>
        <h1>Add Article</h1>
        <WYSIWYGeditor
          name='addarticle'
          onChangeTextJSON={this.onDraftJSChange}
        />
        <RaisedButton
          onClick={this.onSubmit}
          secondary={true}
          type='submit'
          style={styles.raisedButton}
          label='Submit Article'
        />
      </div>
    )
  }
}

export default connect(
  state => ({...state}),
  { newArticle }
)(AddArticleView)