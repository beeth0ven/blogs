import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { modelJson, dataSourceRoute } from './services/falcorService';
import fetchServerSide from "./fetchServerSide";

import React from 'react';
import ReactRouter from 'react-router'
import {match, RoutingContext} from 'react-router';
import {createStore} from "redux";
import * as hist from 'history'
import reducers from '../src/reducers';
import routes from '../src/routes';
import {renderToStaticMarkup} from 'react-dom/server';
import {Provider} from "react-redux";


const app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(modelJson, dataSourceRoute);
app.use('/static', express.static('dist'));

let handleServerSideRender = (req, res, next) => {
  try {
    let initMOCKStore = fetchServerSide();
    const store = createStore(reducers, initMOCKStore);
    const location = hist.createLocation(req.path);

    match({
      routes: routes,
      location
    }, (err, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (err) {
        console.log(err);
        next(err);
        // res.send(500, error.message);
      } else if (renderProps === null) {
        res.status(404)
          .send('Not found')
      } else {
        
        if (typeof renderProps === 'undefined') {
          return;
        }

        let html = renderToStaticMarkup(
          <Provider store={store}>
            <RoutingContext {...renderProps}/>
          </Provider>
        );

        const initialState = store.getState();

        let fullHTML = renderFullHtml(html, initialState);
        res.send(fullHTML);
      }
    });
  } catch (err) {
    next(err)
  }
};

let renderFullHtml = (html, initialState) => {
  return `
  <!doctype html>
  <html>
    <head>
     <title>Publishing App Server Side Rendering</title>
    </head>
    <body>
      <h1>Server side publishing app</h1>
      <div id="publishingAppRoot">${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/static/app.js"></script>
    </body>
  </html>
  `
};

app.use(handleServerSideRender);


app.server.listen(process.env.PORT || 3000);
console.log(`Stated on port ${app.server.address().port}`);

export default app;