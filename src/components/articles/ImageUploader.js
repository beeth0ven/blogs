import React from 'react';
import ReactS3Uploader from "react-s3-uploader";
import {Paper} from "material-ui";


class ImageUploader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploadDetails: null,
      uploadProgress: null,
      uploadError: null,
      articlePicUrl: props.articlePicUrl
    };
  };

  onUploadProgress = (progressInPercent, uploadStatusText) => {
    this.setState({
      uploadProgress: { progressInPercent, uploadStatusText },
      uploadError: null
    })
  };

  onUploadError = (uploadError) => {
    this.setState({
      uploadProgress: null,
      uploadError
    })
  };

  onUploadFinish = (uploadDetails) => {
    const articlePicUrl = '/s3/img/'+uploadDetails.filename;
    this.setState({
      uploadProgress: null,
      uploadDetails,
      articlePicUrl
    });
    this.props.onImgUrlChange(articlePicUrl);
  };

  styles = {
    articlePic: {
      maxWidth: 200,
      maxHeight: 200,
      margin: 'auto'
    },
    paper: {
      padding: 32,
      margin: 'auto',
      width: 300
    }
  };

  imgUploadProgressJSX = () => {
    const { uploadProgress, articlePicUrl } = this.state;
    if (uploadProgress) {
      return (<div>
        {uploadProgress.uploadStatusText}
        ({uploadProgress.progressInPercent}%)
      </div>)
    } else if (articlePicUrl) {
      return <img src={articlePicUrl} style={this.styles.articlePic} />
    }
  };

  uploaderJSX = () =>
    (<ReactS3Uploader
      signingUrl='/s3/sign'
      accept='image/*'
      onProgress={this.onUploadProgress}
      onError={this.onUploadError}
      onFinish={this.onUploadFinish}
    />);

  render() {
    return (
      <Paper zDepth={1} style={this.styles.paper}>
        {this.imgUploadProgressJSX()}
        {this.uploaderJSX()}
      </Paper>
    )
  }
}

export default ImageUploader;