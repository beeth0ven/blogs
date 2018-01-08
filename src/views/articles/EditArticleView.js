import React from 'react';
import {connect} from "react-redux";
import { stateToHTML } from 'draft-js-export-html';
import {deleteArticle, editArticle} from "../../actions/article";
import {Link} from "react-router";
import {Popover, RaisedButton} from "material-ui";
import WYSIWYGeditor from "../../components/articles/WYSIWYGeditor";
import falcorModel from "../../falcorModel";

class EditArticleView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleFetchError: null,
      articleEditSuccess: null,
      editedArticleID: null,
      article: null,
      title: 'test',
      contentJSON: {},
      htmlContent: '',
      openDelete: false,
      deleteAnchorEl: null
    }
  }

  componentWillMount() {
    this.fetchArticleData()
  }

  fetchArticleData = () => {
    const articleID = this.props.params.articleID;
    const hasArticleID = typeof window !== 'undefined' && articleID;
    if (hasArticleID) {
      const { articles } = this.props;
      let article = articles.get(articleID);
      if (article) {
        this.setState({
          editedArticleID: articleID,
          article
        })
      } else {
        this.setState({ articleFetchError: true })
      }
    }
  };

  onDraftJSChange = (contentJSON, contentState) => {
    let htmlContent = stateToHTML(contentState);
    this.setState({contentJSON, htmlContent})
  };

  onSubmit = async () => {
    const editedArticleID = this.state.editedArticleID;
    const editedArticle = {
      _id: editedArticleID,
      articleTitle: this.state.title,
      articleContent: this.state.htmlContent,
      articleContentJSON: this.state.contentJSON
    };

    await falcorModel
      .call(['articles', 'update'], [editedArticle]);

    this.props.editArticle(editedArticle);
    this.setState({articleEditSuccess: true});
  };

  onDeleteClick = (event) => {
    this.setState({
      openDelete: true,
      deleteAnchorEl: event.currentTarget
    })
  };

  onConfirmDelete = async () => {
    const articleID = this.state.editedArticleID;

    await falcorModel
      .call(['articles', 'delete'], [articleID]);

    this.props.deleteArticle(articleID);

    this.setState({openDelete: false});
    this.props.history.pushState(null, '/dashboard');
  };

  onCancelDelete = () => {
    this.setState({openDelete: false});
  };

  render() {

    const styles = {
      rootDiv: {height: '100%', width: '75%', margin: 'auto'},
      raisedButton: {margin: '10px auto', display: 'block', width: 150}
    };

    if (this.state.articleFetchError) {
      return <h1>Article not found(invalid article's ID {this.props.params.articleID})</h1>
    } else if (!this.state.editedArticleID) {
      return <h1>Loading article details</h1>
    } else if (this.state.articleEditSuccess) {
      return (
        <div style={styles.rootDiv}>
          <h3>Your article has been edited successfully</h3>
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

    const initialValue = this.state.article.articleContentJSON;

    return (
      <div style={styles.rootDiv}>
        <h1>Edit an existing article</h1>
        <WYSIWYGeditor
        initialValue={initialValue}
        name='editarticle'
        title='Edit an article'
        onChangeTextJSON={this.onDraftJSChange}
      />
        <RaisedButton
          onClick={this.onSubmit}
          secondary={true}
          type='submit'
          style={styles.raisedButton}
          label='Submit Edition'
        />
        <hr/>
        <h1>Delete permanently this article</h1>
        <RaisedButton
          onClick={this.onDeleteClick}
          label='Delete'
        />
        <Popover
          open={this.state.openDelete}
          anchorEl={this.state.deleteAnchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.onCancelDelete}
        >
          <div style={{padding: 20}}>
            <RaisedButton
              onClick={this.onConfirmDelete}
              primary={true}
              label='Permanent delete, click here'
            />
          </div>
        </Popover>
      </div>
    )
  }
}

export default connect(
  (state) => ({...state}),
  ({editArticle, deleteArticle})
)(EditArticleView);