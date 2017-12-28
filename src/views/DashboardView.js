import React from 'react';
import {connect} from "react-redux";
import RaisedButton from "material-ui/lib/raised-button";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import {Link} from "react-router";

class DashboardView extends React.Component {

  articleJSX = (key, article) => (
    <ListItem
      key={key}
      leftAvatar={<img
        src='/static/placeholder.png'
        width='50'
        height='50'
        />}
      primaryText={article.articleTitle}
      secondaryText={article.articleContent}
    />
  );

  render() {

    const { articles } = this.props;
    const articlesJSX = Object.keys(articles)
      .map(key => this.articleJSX(key, articles[key]));

    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <Link to='/add-article'>
          <RaisedButton
            label='Create an article'
            secondary={true}
            style={{margin: '20px 20px 20px 20px'}}
          />
        </Link>

        <List>
          {articlesJSX}
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({...state}),
  dispatch => ({})
)(DashboardView)