import React from 'react';
import {connect} from 'react-redux';
import WYSIWYGeditor from "../../components/articles/WYSIWYGeditor";
import { stateToHTML } from 'draft-js-export-html';
import {newArticle} from "../../actions/article";
import {Link} from "react-router";
import {RaisedButton} from "material-ui";
import falcorModel from "../../falcorModel";
import ImageUploader from "../../components/articles/ImageUploader";
import {DEFAULT_ARTICLE_PIC_URL} from "../../internal/Constant";
import { Form } from 'formsy-react';
import DefaultInput from "../../components/DefaultInput";

class AddArticleView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentJSON: {},
      htmlContent: '',
      newArticleID: null,
      articlePicUrl: DEFAULT_ARTICLE_PIC_URL
    };
  }

  onDraftJSChange = (contentJSON, contentState) => {
    let htmlContent = stateToHTML(contentState);
    this.setState({contentJSON, htmlContent});
  };

  onImgUrlChange = (articlePicUrl) => {
    this.setState({articlePicUrl})
  };

  onSubmit = async (formInfo) => {

    let newArticleObject = {
      articleTitle: formInfo.title,
      articleSubTitle: formInfo.subTitle,
      articleContent: this.state.htmlContent,
      articleContentJSON: this.state.contentJSON,
      articlePicUrl: this.state.articlePicUrl
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
      raisedButton: {margin: '10px auto', display: 'block', width: 150},
      imgUploaderDiv: {margin: '10px 10px 10px 10px'}
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

        <Form onSubmit={this.onSubmit}>

          <DefaultInput
            onChange={(event) => {}}
            name='title'
            title='Article Title (required)'
            required
          />

          <DefaultInput
            onChange={(event) => {}}
            name='subTitle'
            title='Article Subtitle'
          />

          <WYSIWYGeditor
            name='addarticle'
            onChangeTextJSON={this.onDraftJSChange}
          />

          <div style={styles.imgUploaderDiv}>
            <ImageUploader
              articlePicUrl={this.state.articlePicUrl}
              onImgUrlChange={this.onImgUrlChange}
            />
          </div>

          <RaisedButton
            secondary={true}
            type='submit'
            style={styles.raisedButton}
            label='Submit Article'
          />

        </Form>
      </div>
    )
  }
}

export default connect(
  state => ({...state}),
  { newArticle }
)(AddArticleView)