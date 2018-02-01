import React from 'react'
import {connect} from "react-redux";
import {Avatar, List, ListItem, RaisedButton} from "material-ui";
import {DEFAULT_ARTICLE_IMAGE} from "../config";
import {newArrayFromMap} from "../libaries/public/map";

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
  <ListItem
    key={key}
    leftAvatar={<Avatar src={DEFAULT_ARTICLE_IMAGE} />}
    primaryText={article.title}
    secondaryText={article.content}
  />
);

const Dashboard = ({ articles }) => (
  <div style={styles.rootDiv}>
    <List>
      {newArrayFromMap(articles, ItemJSX)}
    </List>
    <RaisedButton
      style={styles.addButton}
      secondary={true}
      label={'New Article'}
    />
  </div>
);

export default connect(
  state => ({...state.article})
)(Dashboard);