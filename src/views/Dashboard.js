import React from 'react'
import {connect} from "react-redux";
import Avatar from "material-ui/Avatar";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import RaisedButton from "material-ui/RaisedButton";
import {DEFAULT_ARTICLE_IMAGE} from "../config";
import {newArrayFromMap} from "../libaries/public/map";
import {Link} from "react-router";

const styles = {
  rootDiv:  {
    width: '75%',
    height: '100%',
    margin: 'auto'
  },
  addButton: {
    display: 'block',
    maxWidth: 300,
    margin: '0 auto'
  }
};

const ItemJSX = (key, article) => (
  <Link key={key} to={`/updateArticle/${key}`}>
    <ListItem
      leftAvatar={<Avatar src={DEFAULT_ARTICLE_IMAGE} />}
      primaryText={article.title}
      secondaryText={article.content}
    />
  </Link>
);

const Dashboard = ({ articles }) => (
  <div style={styles.rootDiv}>
    <List>
      {newArrayFromMap(articles, ItemJSX)}
    </List>
    <Link to='/newArticle'>
      <RaisedButton
        style={styles.addButton}
        secondary={true}
        label={'New Article'}
      />
    </Link>
  </div>
);

export default connect(
  state => ({...state.article})
)(Dashboard);