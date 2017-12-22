

import React from "react";
import {Card, CardHeader, CardMedia, CardTitle, Paper} from "material-ui";

class ArticleCard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.title || 'no title provided';
    const content = this.props.content || 'no content provided';

    const paperStyle = {
      padding: 10,
      width: '100%',
      height: 300,
    };

    const leftDivStyle = {
      width: '30%',
      float: 'left'
    };

    const rightDivStyle = {
      width: '60%',
      float: 'left',
      padding: '10px 10px 10px 10px'
    };

    return (
      <Paper style={paperStyle}>
        <CardHeader
          title={title}
          subtitle='Subtitle'
          avatar='/static/avatar.png'
        />

        <div style={leftDivStyle}>
          <Card>
            <CardMedia
              overlay={<CardTitle title={title} subtitle='Overlay subtitle'/>}
            >
              <img src='/static/placeholder.png' height='190' />
            </CardMedia>
          </Card>
        </div>
        <div style={rightDivStyle}>
          {content}
        </div>
      </Paper>
    );
  }
}

export default ArticleCard;