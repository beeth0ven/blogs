import React, { Component } from "react";
import {Link} from "react-router";
import {RaisedButton} from "material-ui";

const ArticleNotFoundView = ({params}) => (
  <div style={{width: 300, margin: 'auto'}}>
    <h3>Article not found with id: {params._id || ''}</h3>
    <Link to='/dashboard'>
      <RaisedButton
        style={{width: 300}}
        label='Done'
        secondary
      />
    </Link>
  </div>
);

export default ArticleNotFoundView;

